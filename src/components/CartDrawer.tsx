import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CheckoutFlow from './CheckoutFlow';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity 
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleClose = () => {
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[110] h-screen w-full sm:w-[550px] bg-white border-l border-gray-100 flex flex-col shadow-2xl overflow-hidden"
          >
            {isCheckingOut ? (
              <CheckoutFlow onCancel={() => setIsCheckingOut(false)} total={subtotal} />
            ) : (
              <>
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5 text-gray-900" />
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900">Tu Carrito</h2>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">{cartItems.length}</span>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-100 mb-6" />
                  <p className="text-xs uppercase tracking-widest text-gray-300">Tu carrito está vacío</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-md overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-titan-dark group-hover:text-titan-orange transition-colors">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-300 hover:text-titan-orange transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                        {item.variant || 'Standard'}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-md px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[11px] font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-black tracking-tighter text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 bg-titan-light border-t border-gray-100">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-titan-dark font-bold tracking-tighter text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
                  <span>Envío</span>
                  <span className="text-titan-green font-black uppercase tracking-widest text-[9px]">Gratis</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-titan-dark">
                  <span className="text-[11px] uppercase font-black tracking-[0.3em]">Total</span>
                  <span className="text-xl font-black tracking-tighter">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-titan-orange text-white py-5 rounded-md text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-titan-orange-hover active:scale-[0.98] shadow-sm mb-4"
              >
                Finalizar Compra
              </button>
              
              <p className="text-[9px] text-center text-gray-400 uppercase tracking-[0.2em] italic">
                Solo envíos a Canarias — Porque somos de AQUÍ
              </p>
            </div>
          </>
        )}
      </motion.aside>
    </>
  )}
</AnimatePresence>
  );
}
