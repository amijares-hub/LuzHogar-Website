import React, { useEffect, useState } from 'react';
import { LuzHogarProduct } from '../mockData';
import ProductCard from './ProductCard';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RecentlyViewedProps {
  onAddToCart: (product: LuzHogarProduct, quantity?: number) => void;
  onBuyNow?: (product: LuzHogarProduct, quantity?: number) => void;
  onQuickView: (product: LuzHogarProduct) => void;
  onCompare?: (product: LuzHogarProduct) => void;
  onClick?: (product: LuzHogarProduct) => void;
}

export default function RecentlyViewedProducts({ onAddToCart, onBuyNow, onQuickView, onCompare, onClick }: RecentlyViewedProps) {
  const [products, setProducts] = useState<LuzHogarProduct[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('luzhogar_recently_viewed');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-titan-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-titan-orange">Tu Historial</span>
            <h2 className="text-3xl font-black tracking-tighter text-titan-dark uppercase mt-2">Vistos <span className="text-titan-orange">Recientemente</span></h2>
          </div>
          <div className="hidden md:flex gap-4">
             <button className="p-3 bg-white border border-gray-100 rounded-full text-titan-dark hover:bg-titan-orange hover:text-white transition-all shadow-sm">
                <ChevronLeft className="h-5 w-5" />
             </button>
             <button className="p-3 bg-white border border-gray-100 rounded-full text-titan-dark hover:bg-titan-orange hover:text-white transition-all shadow-sm">
                <ChevronRight className="h-5 w-5" />
             </button>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] snap-start"
            >
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onBuyNow={onBuyNow}
                onQuickView={onQuickView} 
                onCompare={onCompare} 
                onClick={onClick} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
