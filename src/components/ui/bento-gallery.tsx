"use client"

import React, { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import { cn } from "@/src/lib/utils"
import { X, ShoppingCart, ZoomIn, ZoomOut } from "lucide-react"

// Defines the structure for each image item in the gallery
export type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string
  secondaryImages?: string[]
  span: string // Tailwind CSS grid span classes (e.g., "md:col-span-2")
  price?: number
}

// Defines the props for the main gallery component
interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  title: string
  description: string
  onAddToCart?: (item: any) => void
  animationSpeed?: "slow" | "normal" | "fast"
  gap?: number
  overlayOpacity?: number
}

// Bento Image Component with Loading State
const BentoImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative h-full w-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shimmer_2s_infinite]" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        referrerPolicy="no-referrer"
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  )
}

// Modal component for displaying the selected image
const ImageModal = ({
  item,
  onClose,
  onAddToCart,
}: {
  item: ImageItem
  onClose: () => void
  onAddToCart?: (item: any) => void
}) => {
  const allImages = [item.url, ...(item.secondaryImages || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom if modal is active and not dragging
    if (isDragging) return;
    
    // Smooth zoom without requiring ctrlKey
    const delta = e.deltaY * -0.002;
    setZoom(prev => Math.min(Math.max(1, prev + delta), 4));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 overflow-hidden touch-none"
      onClick={onClose}
      onWheel={handleWheel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 25, delay: 0.1 }}
        className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex-1 flex items-center justify-center overflow-auto scrollbar-hide cursor-move group/modal">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: zoom }}
              exit={{ opacity: 0, scale: 1.1 }}
              drag={zoom > 1}
              dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={allImages[currentIndex]}
              alt={item.title}
              className={cn(
                "h-auto max-h-[65vh] w-auto max-w-full rounded-lg object-contain transition-shadow shadow-2xl",
                zoom > 1 ? "cursor-grabbing" : "cursor-zoom-in"
              )}
              onClick={() => !isDragging && setZoom(zoom === 1 ? 1.5 : 1)}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          {/* Main Controls - Hidden when zoomed */}
          {zoom === 1 && allImages.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 pointer-events-auto">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "w-12 h-12 rounded-md overflow-hidden border-2 transition-all",
                    currentIndex === idx ? "border-titan-orange scale-110 shadow-lg" : "border-white/20 opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Overlay in Modal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center"
        >
          <div className="flex items-center justify-between mb-4">
             <div className="text-left">
                <h2 id="modal-title" className="text-2xl font-black text-white uppercase tracking-tighter">{item.title}</h2>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mt-1">{item.desc}</p>
             </div>
             {item.price && (
               <span className="text-xl font-black text-titan-orange">{item.price}€</span>
             )}
          </div>
          
          <div className="flex items-center justify-center gap-4">
             <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/5">
                <button onClick={() => setZoom(prev => Math.max(1, prev - 0.25))} className="p-1 text-white hover:text-titan-orange transition-colors"><ZoomOut size={14} /></button>
                <span className="text-[10px] font-black text-white w-8">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(prev => Math.min(4, prev + 0.25))} className="p-1 text-white hover:text-titan-orange transition-colors"><ZoomIn size={14} /></button>
             </div>
             
             {onAddToCart && (
               <button 
                onClick={() => {
                  onAddToCart({
                    id: item.id,
                    name: item.title,
                    price: item.price || 299.00,
                    image: allImages[currentIndex],
                    category: 'Highlight'
                  });
                  onClose();
                }}
                className="bg-titan-orange text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-titan-orange-hover transition-all shadow-lg shadow-titan-orange/20"
               >
                 <ShoppingCart size={14} />
                 Añadir
               </button>
             )}
          </div>
        </motion.div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute right-8 top-8 text-white/80 transition-colors hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titan-orange"
        aria-label="Close image view"
      >
        <X size={24} />
      </button>

      {/* High Contrast Support for Buttons */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (forced-colors: active) {
          .bg-white\\/10 { background-color: ButtonFace; border: 1px solid ButtonText; }
          .text-white\\/80 { color: CanvasText; }
        }
      `}} />
    </motion.div>
  )
}

// Animation variants for each gallery item
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

// Main gallery component
const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ 
  imageItems, 
  title, 
  description,
  onAddToCart,
  animationSpeed = "normal",
  gap = 4,
  overlayOpacity = 0.6
}) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null)
  const [dragConstraint, setDragConstraint] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const speedConfig = {
    slow: 0.2,
    normal: 0.1,
    fast: 0.05
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: speedConfig[animationSpeed],
      },
    },
  }

  // Calculate the draggable area constraint
  useEffect(() => {
    const calculateConstraints = () => {
      if (gridRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const gridWidth = gridRef.current.scrollWidth
        // The '- 32' provides some padding at the end
        const newConstraint = Math.min(0, containerWidth - gridWidth - 32)
        setDragConstraint(newConstraint)
      }
    }

    calculateConstraints()
    window.addEventListener("resize", calculateConstraints)
    return () => window.removeEventListener("resize", calculateConstraints)
  }, [imageItems])

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const sectionY = useTransform(scrollYProgress, [0, 0.1], [50, 0])

  return (
    <section
      ref={targetRef}
      className="relative w-full overflow-hidden bg-background py-16 sm:py-24"
      aria-labelledby="gallery-title"
    >
      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="container mx-auto px-4 text-center"
      >
        <h2 id="gallery-title" className="text-3xl lg:text-6xl font-black tracking-tight text-foreground sm:text-4xl uppercase">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
          {description}
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="relative mt-12 w-full cursor-grab active:cursor-grabbing"
        role="region"
        aria-label="Image collection"
      >
        <motion.div
          className="w-max"
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
        >
          <motion.div
            ref={gridRef}
            className={cn("grid auto-cols-[minmax(15rem,1fr)] grid-flow-col px-4 md:px-8")}
            style={{ gap: `${gap * 0.25}rem` }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  "group relative flex h-full min-h-[22rem] w-full min-w-[22rem] cursor-pointer items-end overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titan-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  item.span,
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                tabIndex={0}
                aria-label={`View details for ${item.title}`}
                role="button"
              >
                <div className="absolute inset-0 h-full w-full">
                  <BentoImage 
                    src={item.url} 
                    alt={item.title} 
                    className="transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  />
                </div>
                <div 
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-100" 
                  style={{ opacity: overlayOpacity }}
                />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">{item.title}</h3>
                  <p className="mt-1 text-[10px] font-bold text-white/80 uppercase tracking-widest">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveImageBentoGallery
