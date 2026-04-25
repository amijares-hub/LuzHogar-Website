import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Eye, Heart, Loader2, Check, Scale, Plus, Minus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { LuzHogarProduct } from '@/src/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: LuzHogarProduct;
  onAddToCart?: (product: LuzHogarProduct, quantity?: number) => void;
  onBuyNow?: (product: LuzHogarProduct, quantity?: number) => void;
  onQuickView?: (product: LuzHogarProduct) => void;
  onCompare?: (product: LuzHogarProduct) => void;
  onClick?: (product: LuzHogarProduct) => void;
}

type ButtonState = 'idle' | 'loading' | 'success';

export default function ProductCard({ product, onAddToCart, onBuyNow, onQuickView, onCompare, onClick }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>('idle');
  const [quantity, setQuantity] = useState(1);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('titan_wishlist');
    if (saved) {
      const list = JSON.parse(saved);
      setIsWishlisted(list.includes(product.id));
    }
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const current = !isWishlisted;
    setIsWishlisted(current);
    
    const saved = localStorage.getItem('titan_wishlist');
    let list = saved ? JSON.parse(saved) : [];
    
    if (current) {
      list.push(product.id);
      toast.success("Añadido a tu lista de deseos", {
        icon: <Heart className="h-4 w-4 fill-red-500 text-red-500" />
      });
    } else {
      list = list.filter((id: string) => id !== product.id);
      toast.info("Eliminado de tu lista de deseos");
    }
    
    localStorage.setItem('titan_wishlist', JSON.stringify(list));
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (buttonState !== 'idle') return;

    setButtonState('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setButtonState('success');
    onAddToCart?.(product, quantity);
    
    // Reset after some time
    setTimeout(() => {
      setButtonState('idle');
    }, 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNow?.(product, quantity);
    if (!onBuyNow && onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  return (
    <motion.div 
      onClick={() => onClick?.(product)}
      whileHover={{ scale: 1.02, y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-md shadow-sm cursor-pointer relative"
    >
      {/* Toast Notification (Local) */}
      <AnimatePresence>
        {buttonState === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 10, 
              scale: 1,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
              } 
            }}
            exit={{ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.2 } }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-[30] bg-titan-green text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Check className="h-3 w-3" />
            </motion.div>
            Producto Añadido
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-titan-light">
        {/* Wishlist Button */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-titan-dark hover:bg-white transition-all shadow-md group/heart"
        >
          <Heart className={cn(
            "h-4 w-4 transition-all duration-300",
            isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-gray-400 group-hover/heart:scale-110"
          )} />
        </button>

        {/* Badge with Pulse */}
        <AnimatePresence>
          {product.badge && (
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "absolute top-4 left-4 z-10 px-3 py-1 text-white text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg",
                product.badge.includes('%') || product.badge === "SuperVentas" ? "bg-titan-green" : "bg-titan-orange"
              )}
            >
              {product.badge}
            </motion.div>
          )}
        </AnimatePresence>

        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 group-hover:brightness-90 group-hover:blur-[1px]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-titan-dark/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={(e) => {
               e.stopPropagation();
               onQuickView?.(product);
             }}
             className="bg-white text-titan-dark p-4 rounded-full translate-y-10 group-hover:translate-y-0 transition-all duration-500 hover:bg-titan-dark hover:text-white shadow-xl flex"
           >
             <Eye className="h-5 w-5" />
           </motion.button>
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={(e) => {
               e.stopPropagation();
               onCompare?.(product);
               toast.success(`${product.name} añadido a la comparación`, {
                 icon: <Scale className="h-4 w-4" />
               });
             }}
             className="bg-white text-titan-dark p-4 rounded-full translate-y-10 group-hover:translate-y-0 transition-all duration-500 hover:bg-titan-orange hover:text-white shadow-xl flex"
           >
             <Scale className="h-5 w-5" />
           </motion.button>
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={handleAddToCart}
             disabled={buttonState !== 'idle'}
             className={cn(
               "p-4 rounded-full translate-y-10 group-hover:translate-y-0 transition-all duration-500 shadow-xl flex",
               buttonState === 'success' ? "bg-titan-green text-white" : "bg-titan-orange text-white hover:bg-titan-orange-hover"
             )}
           >
             {buttonState === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : 
              buttonState === 'success' ? <Check className="h-5 w-5" /> : 
              <ShoppingCart className="h-5 w-5" />}
           </motion.button>
        </div>
        
        {/* Mobile Indicator */}
        <div className="md:hidden absolute bottom-4 left-4 right-4 pointer-events-none">
           <div className="bg-white/90 backdrop-blur-sm text-titan-dark py-2 px-4 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-lg inline-flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-titan-green rounded-full animate-pulse" />
             Canarias Stock
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.25em] font-bold">
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <Star className="h-2.5 w-2.5 fill-titan-orange text-titan-orange" />
            <span className="text-[10px] text-gray-500 font-bold">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-sm font-bold text-titan-dark group-hover:text-titan-orange transition-colors mb-4 line-clamp-1 uppercase tracking-tight">
          {product.name}
        </h3>
        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4 bg-white border-2 border-gray-100 rounded-full p-1 shadow-inner group/qty h-16 relative px-2">
           <motion.button 
             whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6", borderColor: "rgba(0,0,0,0.1)" }}
             whileTap={{ scale: 0.9 }}
             onClick={(e) => { e.stopPropagation(); setQuantity(prev => Math.max(1, prev - 1)); }}
             className="w-12 h-12 flex items-center justify-center text-titan-dark border-2 border-gray-50 hover:border-gray-200 transition-all rounded-full shadow-sm"
           >
             <Minus className="h-5 w-5" />
           </motion.button>
           
           <div className="flex flex-col items-center justify-center flex-1 relative h-full">
             <span className="text-[7px] font-black uppercase text-titan-orange tracking-widest absolute -top-1 opacity-0 group-hover/qty:opacity-100 transition-all transform translate-y-2 group-hover/qty:translate-y-0">CANTIDAD</span>
             <AnimatePresence mode="wait">
               <motion.span 
                 key={quantity}
                 initial={{ y: 20, opacity: 0, scale: 0.5 }}
                 animate={{ y: 0, opacity: 1, scale: 1 }}
                 exit={{ y: -20, opacity: 0, scale: 0.5 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
                 className="text-2xl font-black italic tracking-tighter text-titan-dark"
               >
                 {quantity.toString().padStart(2, '0')}
               </motion.span>
             </AnimatePresence>
           </div>
           

           <motion.button 
             whileHover={{ scale: 1.1, backgroundColor: "#fff7ed", borderColor: "rgba(249, 115, 22, 0.2)" }}
             whileTap={{ scale: 0.9 }}
             onClick={(e) => { e.stopPropagation(); setQuantity(prev => prev + 1); }}
             className="w-12 h-12 flex items-center justify-center text-titan-orange border-2 border-gray-50 hover:border-titan-orange/20 transition-all rounded-full shadow-sm"
           >
             <Plus className="h-5 w-5" />
           </motion.button>
        </div>

        {/* Ver Detalles Button */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(product);
          }}
          className="w-full mb-5 flex items-center justify-center gap-2 py-3 border border-gray-100 bg-titan-light/30 rounded-sm text-[9px] font-black text-titan-dark uppercase tracking-[0.2em] hover:bg-white transition-all group/details"
        >
          <Eye className="h-3 w-3 group-hover/details:text-titan-orange transition-colors" />
          Ver Detalles Completos
        </motion.button>

        <div className="flex items-end justify-between mb-6 border-b border-gray-50 pb-4">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through tracking-tighter">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-black text-titan-dark tracking-tighter italic">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-1">
             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Entrega 24H</span>
             <div className="w-12 h-[3px] bg-titan-orange rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
           <motion.button 
             whileHover={{ y: -2 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleAddToCart}
             disabled={buttonState !== 'idle'}
             className={cn(
               "flex items-center justify-center gap-2 py-4 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all px-2 relative overflow-hidden group/cart",
               buttonState === 'success' ? "bg-titan-green text-white shadow-xl shadow-green-200" : 
               buttonState === 'loading' ? "bg-gray-100 text-gray-400" :
               "bg-titan-dark text-white hover:bg-black/90 shadow-md"
             )}
           >
             {buttonState === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
             ) : buttonState === 'success' ? (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Añadido</span>
                </motion.div>
             ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -10 }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </motion.div>
                  Al Carrito
                </>
             )}
             {buttonState === 'success' && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
             )}
           </motion.button>

           <motion.button 
             whileHover={{ y: -2, scale: 1.02 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleBuyNow}
             className="bg-gradient-to-br from-titan-orange via-titan-orange to-orange-700 text-white py-4 rounded-sm text-[9px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-orange-200 transition-all shadow-lg active:scale-[0.98] border border-white/10"
           >
             Compra YA
           </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onCompare?.(product);
            toast.success(`${product.name} listo para comparar`, {
              icon: <Scale className="h-4 w-4 text-titan-orange" />,
              description: "Puedes verlo en la barra de comparación."
            });
          }}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-100 bg-white rounded-sm text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] hover:text-titan-dark transition-all"
        >
          <Scale className="h-3 w-3" />
          Añadir a Comparar
        </motion.button>
      </div>
      
      {/* Dynamic Bottom Button - Hidden by default, maybe for mobile or quick actions */}
      <div className="h-1 w-full bg-titan-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
}
