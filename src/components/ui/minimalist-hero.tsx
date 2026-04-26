import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { LucideIcon, Facebook, Instagram, Twitter, Linkedin, ChevronLeft, ChevronRight, X, MapPin, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  carouselItems: { image: string; text: string }[];
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  onReadMoreClick?: () => void;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children, index, ...props }: { href: string; children: React.ReactNode; index: number; [key: string]: any }) => (
  <motion.a
    initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 * index }}
    href={href}
    {...props}
    className="text-[10px] font-black tracking-[0.3em] text-gray-500 transition-colors hover:text-titan-dark uppercase italic"
  >
    {children}
  </motion.a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon, index, ...props }: { href: string; icon: LucideIcon; index: number; [key: string]: any }) => (
  <motion.a 
    initial={{ opacity: 0, scale: 0, rotate: -20 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ 
      type: "spring", 
      stiffness: 260, 
      damping: 20, 
      delay: 0.8 + (0.1 * index) 
    }}
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    {...props} 
    className="text-gray-400 transition-colors hover:text-titan-orange"
  >
    <Icon className="h-4 w-4" />
  </motion.a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  carouselItems,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  onReadMoreClick,
  className,
}: MinimalistHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const imageScale = useTransform(scrollY, [0, 500], [1.1, 1.3]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        'relative flex min-h-[100dvh] w-full flex-col items-center justify-between bg-white p-8 font-sans md:p-12',
        className
      )}
    >
      {/* Background Parallax Layer */}

      {/* Main Content Area */}
      <motion.div 
        style={{ y: contentY }}
        className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-10 md:gap-0 md:grid-cols-3"
      >
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-20 order-2 md:order-1 text-center md:text-left px-4 md:px-0"
        >
          <p className="mx-auto max-w-xs text-[10px] md:text-[11px] font-bold leading-relaxed text-gray-500 md:mx-0 uppercase tracking-widest">{mainText}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReadMoreClick}
            className="mt-4 md:mt-6 inline-block text-[10px] md:text-[11px] font-black text-titan-dark uppercase tracking-[0.2em] italic border-b-2 border-titan-orange pb-1"
          >
            EXPLORAR MÁS
          </motion.button>
        </motion.div>

        {/* Center Carousel */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-[300px] md:h-full group">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[220px] w-[220px] rounded-full bg-titan-orange/10 md:h-[380px] md:w-[380px] lg:h-[480px] lg:w-[480px]"
            ></motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1.1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.img
                    style={{ scale: imageScale }}
                    src={carouselItems[currentIndex].image}
                    alt={imageAlt}
                    className="h-auto w-48 md:w-80 lg:w-96 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-4"
                    referrerPolicy="no-referrer"
                />
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-titan-orange italic text-center"
                >
                  {carouselItems[currentIndex].text}
                </motion.span>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4 z-20 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="p-1.5 md:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-titan-dark hover:bg-titan-orange hover:text-white transition-all transform hover:-translate-x-1"
                aria-label="Diapositiva anterior"
                title="Anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="p-1.5 md:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-titan-dark hover:bg-titan-orange hover:text-white transition-all transform hover:translate-x-1"
                aria-label="Siguiente diapositiva"
                title="Siguiente"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-0 md:bottom-10 flex gap-2 z-20">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-1 transition-all duration-500 rounded-full",
                    currentIndex === i ? "w-6 md:w-8 bg-titan-orange" : "w-1.5 md:w-2 bg-gray-200"
                  )}
                  aria-label={`Ir a diapositiva ${i + 1}`}
                  title={`Ver diapositiva ${i + 1}`}
                />
              ))}
            </div>
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="z-20 order-3 flex items-center justify-center text-center md:text-right md:justify-end"
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-titan-dark tracking-tighter uppercase italic leading-[0.8] text-center md:text-right">
            {overlayText.part1}
            <br />
            <span className="text-titan-orange">{overlayText.part2}</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Footer Elements */}
      <footer className="z-30 flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-6 md:gap-0 mt-8 md:mt-0 pb-8 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto"
        >
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <SocialIcon key={index} href={link.href} icon={link.icon} index={index} />
            ))}
          </div>
          <div className="hidden md:block h-8 w-px bg-gray-100 mx-2" />
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#f0f0f0' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-titan-dark shadow-sm transition-all"
          >
            Descubre la Colección
          </motion.button>
        </motion.div>
        
        <div className="relative mt-4 md:mt-0 w-full md:w-auto flex justify-center md:justify-end">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 italic hover:text-titan-orange transition-colors group"
          >
            <MapPin size={10} className="group-hover:animate-bounce" />
            {locationText}
          </motion.button>

          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-full right-0 mb-4 w-72 h-48 bg-white p-2 rounded-xl shadow-2xl border border-gray-100 z-[100]"
              >
                <button 
                  onClick={() => setShowMap(false)}
                  className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-titan-dark z-10 hover:bg-titan-orange hover:text-white transition-all shadow-sm"
                  aria-label="Cerrar mapa"
                  title="Cerrar"
                >
                  <X size={14} />
                </button>
                <div className="w-full h-full rounded-lg overflow-hidden bg-titan-light relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80" 
                    alt="Map view"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-titan-orange/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href="https://google.com/maps" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white text-titan-dark px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
    </div>
  );
};
