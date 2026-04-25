import React, { useState } from 'react';
import { Star, Plus, Minus, ShieldCheck, Truck, RefreshCcw, ChevronDown, ChevronUp, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

import ProductCard from './ProductCard';
import { LuzHogarProduct } from '../mockData';

const relatedProducts: LuzHogarProduct[] = [
  { id: '101', name: 'HELADERA PREMIUM', slug: 'heladera-premium', category: 'Electrodomésticos', brand: 'TITAN', price: 899.00, originalPrice: 1099.00, stock: 5, rating: 4.8, reviewsCount: 45, image: 'https://images.unsplash.com/photo-1571175432248-18e3a27072a4?w=600&q=80', specs: {}, badge: '-200€' },
  { id: '102', name: 'LAVAVAJILLAS SILENT', slug: 'lavavajillas-silent', category: 'Electrodomésticos', brand: 'TITAN', price: 650.00, stock: 8, rating: 4.7, reviewsCount: 32, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80', specs: {}, badge: 'Eco' },
  { id: '103', name: 'HORNO CONVECCIÓN', slug: 'horno-conveccion', category: 'Electrodomésticos', brand: 'TITAN', price: 420.00, stock: 12, rating: 4.9, reviewsCount: 18, image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=600&q=80', specs: {}, badge: 'Top' },
  { id: '104', name: 'MICROONDAS INVERTER', slug: 'microondas-inverter', category: 'Electrodomésticos', brand: 'TITAN', price: 185.00, stock: 15, rating: 4.5, reviewsCount: 22, image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80', specs: {}, badge: 'Nuevo' },
];

export default function ProductDetailPage({ onAddToCart, onBuyNow, onQuickView }: { onAddToCart: (product: LuzHogarProduct, quantity?: number) => void, onBuyNow?: (product: LuzHogarProduct, quantity?: number) => void, onQuickView?: (product: LuzHogarProduct) => void }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('xl');
  const [expandedSection, setExpandedSection] = useState<string | null>('specs');

  const images = [
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1501700493788-fa1a4fc0f271?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1508612761958-e931d843bdd5?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1549497538-301225c1f396?auto=format&fit=crop&q=80&w=600',
  ];

  const colors = [
    { name: 'Titan Black', id: 'black', hex: '#000000' },
    { name: 'Raw Silver', id: 'silver', hex: '#C0C0C0' },
    { name: 'Desert Tan', id: 'tan', hex: '#D2B48C' },
  ];

  const sizes = ['Standard', 'XL', 'Pro V2'];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: '1',
      name: 'Titan Core L01 Hybrid',
      slug: 'titan-core-l01-hybrid',
      category: 'Iluminación',
      brand: 'Titan',
      price: 299.00,
      stock: 12,
      rating: 4.9,
      reviewsCount: 128,
      image: images[0],
      specs: {},
      badge: '-15%'
    });
  };
  const Accordion = ({ id, title, content }: { id: string, title: string, content: React.ReactNode }) => (
    <div className="border-b border-gray-100 overflow-hidden">
      <button 
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between py-6 text-[10px] uppercase font-black tracking-[0.3em] text-titan-dark hover:text-titan-orange transition-colors"
      >
        {title}
        {expandedSection === id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <AnimatePresence>
        {expandedSection === id && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-xs text-gray-500 leading-relaxed uppercase tracking-widest">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Gallery */}
        <div className="space-y-6 lg:sticky lg:top-32 h-fit">
          <div className="relative aspect-[4/5] bg-titan-light border border-gray-100 rounded-md overflow-hidden group/gallery">
            <motion.div 
              className="flex h-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 && selectedImage < images.length - 1) {
                  setSelectedImage(prev => prev + 1);
                } else if (info.offset.x > 50 && selectedImage > 0) {
                  setSelectedImage(prev => prev - 1);
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedImage}
                  src={images[selectedImage]} 
                  alt="Titan Product" 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none" 
                  loading="lazy" 
                />
              </AnimatePresence>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button 
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
                className={cn(
                  "p-3 rounded-full bg-white/80 backdrop-blur-md text-titan-dark shadow-xl transition-all pointer-events-auto",
                  selectedImage === 0 ? "opacity-0 invisible" : "opacity-0 group-hover/gallery:opacity-100"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}
                disabled={selectedImage === images.length - 1}
                className={cn(
                  "p-3 rounded-full bg-white/80 backdrop-blur-md text-titan-dark shadow-xl transition-all pointer-events-auto",
                  selectedImage === images.length - 1 ? "opacity-0 invisible" : "opacity-0 group-hover/gallery:opacity-100"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
               {images.map((_, i) => (
                 <div 
                   key={i} 
                   className={cn(
                     "h-1.5 transition-all rounded-full",
                     selectedImage === i ? "w-8 bg-titan-orange" : "w-1.5 bg-white/50"
                   )} 
                 />
               ))}
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "w-24 h-24 shrink-0 border transition-all duration-300 bg-titan-light rounded-md overflow-hidden",
                  selectedImage === i ? "border-titan-orange scale-95" : "border-gray-100 opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover grayscale" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-10 pb-10 border-b border-gray-100">
            <div className="flex items-center gap-2 text-titan-orange mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">(128 Reseñas)</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-titan-dark uppercase mb-6 leading-none">
              Titan Core <br />
              <span className="text-titan-orange italic font-serif font-light tracking-tight">L01 Hybrid</span>
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-black tracking-tighter text-titan-dark">$299.00</span>
              <span className="text-sm text-gray-300 line-through tracking-tighter">$349.00</span>
              <span className="bg-titan-green text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded-sm">-15%</span>
            </div>
          </div>

          <div className="mb-10 flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-titan-green animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-titan-green">
               Stock en Canarias - Envíos en 24h
             </span>
          </div>

          {/* Variants */}
          <div className="space-y-10 mb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Color: <span className="text-titan-dark ml-2">Titan Black</span></p>
              <div className="flex gap-4">
                {colors.map(color => (
                  <button 
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all p-0.5",
                      selectedColor === color.id ? "border-titan-orange scale-110" : "border-gray-200 hover:border-gray-400"
                    )}
                  >
                    <div className="w-full h-full rounded-full" style={{ background: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Configuración: <span className="text-titan-dark ml-2">{selectedSize.toUpperCase()}</span></p>
              <div className="flex gap-3">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-6 py-3 border rounded-md text-[11px] font-black uppercase tracking-widest transition-all",
                      selectedSize === size ? "border-titan-orange bg-titan-orange text-white" : "border-gray-200 text-gray-400 hover:border-gray-400"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity and CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex items-center gap-6 bg-titan-light border border-gray-100 p-4 shrink-0 rounded-md shadow-sm">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-400 hover:text-titan-dark transition-colors"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-xl font-black text-titan-dark w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-400 hover:text-titan-dark transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-titan-orange text-white p-5 rounded-md text-[11px] font-black uppercase tracking-[0.3em] hover:bg-titan-orange-hover transition-all flex items-center justify-center gap-3 shadow-md"
            >
              <ShoppingBag className="h-4 w-4" /> Añadir al carrito
            </button>
          </div>

          <button className="w-full bg-titan-dark text-white p-5 rounded-md text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-3 mb-16 shadow-md">
             Pagar con <span className="font-sans italic">Apple Pay</span>
          </button>

          {/* Accordions */}
          <div className="border-t border-gray-100">
            <Accordion 
              id="description" 
              title="Descripción" 
              content="El Titan Core L01 es la cúspide de la tecnología de iluminación. Producto exclusivo para el mercado canario."
            />
            <Accordion 
              id="specs" 
              title="Especificaciones" 
              content={(
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-gray-50 pb-2"><span>Potencia:</span> <span className="text-titan-dark font-bold">12,000 Lumens</span></li>
                  <li className="flex justify-between border-b border-gray-50 pb-2"><span>Autonomía:</span> <span className="text-titan-dark font-bold">48 horas</span></li>
                  <li className="flex justify-between"><span>Material:</span> <span className="text-titan-dark font-bold">Polímero de Alta Densidad</span></li>
                </ul>
              )}
            />
            <Accordion 
              id="shipping" 
              title="Envíos y Devoluciones" 
              content="Envíos garantizados en 24h para Canarias. Devoluciones gratuitas en un plazo de 30 días sin preguntas."
            />
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="text-center group">
              <ShieldCheck className="h-6 w-6 text-gray-200 mx-auto mb-3 group-hover:text-titan-orange transition-colors" />
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Garantía<br/>De por vida</p>
            </div>
            <div className="text-center group">
              <Truck className="h-6 w-6 text-gray-200 mx-auto mb-3 group-hover:text-titan-orange transition-colors" />
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Envío Gratis<br/>En Canarias</p>
            </div>
            <div className="text-center group">
              <RefreshCcw className="h-6 w-6 text-gray-200 mx-auto mb-3 group-hover:text-titan-orange transition-colors" />
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Devolución<br/>Garantizada</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="mt-32 pt-24 border-t border-gray-100">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-titan-dark">También te podría gustar</h2>
          <div className="flex gap-2">
            <div className="h-1 w-12 bg-titan-orange rounded-full" />
            <div className="h-1 w-4 bg-gray-100 rounded-full" />
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-10 gap-8 scrollbar-hide snap-x snap-mandatory">
          {relatedProducts.map(product => (
            <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onBuyNow={onBuyNow}
                onQuickView={onQuickView} 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
