import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, ArrowRight, ShieldCheck } from 'lucide-react';
import { LuzHogarProduct } from '../mockData';
import { cn } from '@/src/lib/utils';

interface ComparisonToolProps {
  items: LuzHogarProduct[];
  onRemove: (id: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ComparisonTool({ items, onRemove, onClear, isOpen, onToggle }: ComparisonToolProps) {
  if (items.length === 0) return null;

  return (
    <>
      {/* Floating Bar */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-32 right-10 z-[150]"
          >
            <button 
              onClick={onToggle}
              className="bg-titan-dark text-white p-5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-titan-orange transition-all group scale-110"
            >
              <div className="relative">
                <Scale className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-titan-orange text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-titan-dark">
                  {items.length}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Comparar</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="absolute inset-0 bg-titan-dark/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-md shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-titan-light rounded-full">
                     <Scale className="h-6 w-6 text-titan-orange" />
                   </div>
                   <div>
                     <h2 className="text-2xl font-black uppercase tracking-tighter text-titan-dark leading-none">Comparativa de Productos</h2>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Analiza especificaciones técnicas lado a lado</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={onClear}
                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Limpiar todo
                  </button>
                  <button 
                    onClick={onToggle}
                    className="p-3 bg-titan-light rounded-full text-titan-dark hover:bg-titan-orange hover:text-white transition-all shadow-sm"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-x-auto p-8">
                <div className="min-w-[800px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="w-1/5 py-6 px-4 bg-titan-light/50 border-b border-gray-100 rounded-tl-md"></th>
                        {items.map(item => (
                          <th key={item.id} className="w-1/5 py-10 px-6 border-b border-gray-100 text-center relative group">
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <div className="aspect-square bg-titan-light rounded-md mb-6 overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-tighter text-titan-dark leading-tight">{item.name}</h3>
                            <p className="text-sm font-black text-titan-orange mt-2">${item.price.toFixed(2)}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Features */}
                      {['Categoría', 'Marca', 'Capacidad', 'Clase Energética', 'Potencia', 'Rating'].map((attr, idx) => (
                        <tr key={attr} className={cn(idx % 2 === 0 ? "bg-white" : "bg-titan-light/30")}>
                          <td className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 border-r border-gray-50">{attr}</td>
                          {items.map(item => (
                            <td key={item.id} className="py-5 px-6 text-center text-xs font-bold text-titan-dark uppercase tracking-tight">
                              {attr === 'Categoría' && item.category}
                              {attr === 'Marca' && item.brand}
                              {attr === 'Rating' && (
                                <div className="flex items-center justify-center gap-1">
                                  <span className="text-titan-orange">★</span> {item.rating}
                                </div>
                              )}
                              {attr !== 'Categoría' && attr !== 'Marca' && attr !== 'Rating' && (item.specs[attr] || '—')}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {/* Shipping/Warranty row */}
                      <tr className="bg-titan-light/50">
                        <td className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 border-r border-gray-50">Confianza</td>
                        {items.map(item => (
                          <td key={item.id} className="py-5 px-6 text-center">
                            <div className="flex flex-col items-center gap-2">
                               <ShieldCheck className="h-4 w-4 text-titan-green" />
                               <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Garantía Premium</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-8 border-t border-gray-100 bg-titan-light/30 shrink-0 flex justify-end">
                <button className="flex items-center gap-3 bg-titan-dark text-white px-8 py-4 rounded-md text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl">
                  Ir al carrito <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
