import React from 'react';
import { X, Star, ShoppingBag, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LuzHogarProduct } from '@/src/mockData';

interface QuickViewModalProps {
  product: LuzHogarProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: LuzHogarProduct) => void;
  onBuyNow?: (product: LuzHogarProduct) => void;
}

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, onBuyNow }: QuickViewModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-titan-dark/80 backdrop-blur-md"
          />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-md shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] p-2 bg-white/80 backdrop-blur-md rounded-full text-titan-dark hover:bg-titan-light transition-all shadow-md group"
                aria-label="Cerrar vista rápida"
                title="Cerrar vista rápida"
              >
                <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-[4/5] bg-titan-light shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col pt-10 md:pt-20 overflow-y-auto md:overflow-visible">
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center gap-2 text-titan-orange mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 md:h-3 md:w-3 fill-current" />)}
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">(4.9)</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-titan-dark uppercase tracking-tighter mb-4 leading-none">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-lg md:text-xl font-black text-titan-dark">${product.price.toFixed(2)}</span>
                    {product.badge && (
                      <span className="bg-titan-green text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded-sm">Oferta</span>
                    )}
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8 mb-8 md:mb-10 overflow-y-auto max-h-40 md:max-h-48 pr-2 scrollbar-hide">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 font-bold border-b border-gray-100 pb-2">Especificaciones Técnicas</p>
                    <div className="grid grid-cols-1 gap-2.5 md:gap-3">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-[10px] md:text-[11px]">
                           <span className="text-gray-400 font-bold uppercase tracking-widest">{key}</span>
                           <span className="text-titan-dark font-black uppercase tracking-tighter">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pb-4 md:pb-0">
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button 
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="flex-1 bg-titan-dark text-white py-4 md:py-5 rounded-md text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-titan-orange transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
                    >
                      <ShoppingBag className="h-4 w-4" /> Al Carrito
                    </button>
                    <button 
                      onClick={() => {
                        onBuyNow?.(product);
                        onClose();
                      }}
                      className="flex-1 bg-titan-orange text-white py-4 md:py-5 rounded-md text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-titan-orange-hover transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
                    >
                      Comprar YA
                    </button>
                  </div>
                  <button 
                     onClick={onClose}
                     className="w-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-titan-dark transition-colors font-bold tracking-widest italic"
                  >
                    Cerrar Vista Rápida
                  </button>
                </div>
              </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
