/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CatalogPage from './components/CatalogPage';
import ProductDetailPage from './components/ProductDetailPage';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import FeaturedProducts from './components/FeaturedProducts';
import ApplianceShowcaseGrid from './components/ApplianceShowcaseGrid';
import AnimatedHeroSection from './components/AnimatedHeroSection';
import CategoryGradientSection from './components/CategoryGradientSection';
import RecentlyViewedProducts from './components/RecentlyViewedProducts';
import BrandsSection from './components/BrandsSection';
import TestimonialsSection from './components/TestimonialsSection';
import { motion, AnimatePresence } from 'motion/react';
import ComparisonTool from './components/ComparisonTool';
import CartDrawer, { CartItem } from './components/CartDrawer';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import QuickViewModal from './components/QuickViewModal';
import { LuzHogarProduct } from './mockData';
import { Toaster, toast } from 'sonner';
import { Scale, ShoppingCart } from 'lucide-react';
import { cn } from './lib/utils';
import { GlassButton } from './components/ui/glass-button';
import { Cta4 } from './components/ui/cta-4';
import { HeroWithMarquee } from './components/ui/cta-with-marquee';

type Page = 'home' | 'catalog' | 'pdp' | 'terms' | 'privacy' | 'admin' | 'account';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<LuzHogarProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [compareItems, setCompareItems] = useState<LuzHogarProduct[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Smart TV LG 55\'\' 4K UHD', price: 459.50, quantity: 1, image: 'https://images.unsplash.com/photo-1593359677770-4669502a35b0?auto=format&fit=crop&q=80&w=600', variant: 'Standard' },
  ]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const addToRecentlyViewed = (product: LuzHogarProduct) => {
    const saved = localStorage.getItem('luzhogar_recently_viewed');
    let list: LuzHogarProduct[] = saved ? JSON.parse(saved) : [];
    
    const filtered = list.filter(p => p.id !== product.id);
    const newList = [product, ...filtered].slice(0, 10);
    localStorage.setItem('luzhogar_recently_viewed', JSON.stringify(newList));
  };

  const handleAddToCart = (product: LuzHogarProduct, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.name === product.name);
      if (existingItem) {
        return prev.map(item => 
          item.name === product.name ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { 
        id: Math.random(), 
        name: product.name, 
        price: product.price, 
        quantity: quantity, 
        image: product.image,
        variant: 'Standard' 
      }];
    });
    setIsCartOpen(true);
    toast.success(`${product.name} añadido al carrito`, {
      description: quantity > 1 ? `${quantity} unidades listas para comprar.` : 'Producto listo para finalizar compra.',
      icon: <span className="text-titan-orange">🛒</span>,
    });
  };

  const handleQuickView = (product: LuzHogarProduct) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    addToRecentlyViewed(product);
  };

  const handleNavigateToPDP = (product: LuzHogarProduct) => {
    addToRecentlyViewed(product);
    setCurrentPage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCompare = (product: LuzHogarProduct) => {
    if (compareItems.find(p => p.id === product.id)) {
      toast.info(`${product.name} ya está en la lista de comparación`);
      return;
    }
    if (compareItems.length >= 4) {
      toast.error("Capacidad máxima de comparación alcanzada (4 productos)");
      return;
    }
    setCompareItems(prev => [...prev, product]);
    toast.success(`${product.name} añadido para comparar`, {
      icon: <Scale className="h-4 w-4 text-titan-orange" />
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareItems(prev => prev.filter(p => p.id !== id));
  };

  const handleClearCompare = () => {
    setCompareItems([]);
    setIsComparisonOpen(false);
  };

  const handleBuyNow = (product: LuzHogarProduct) => {
    handleAddToCart(product);
    setIsCartOpen(true);
    // In a real app, this would redirect to checkout
    toast.info("Redireccionando al flujo de pago...", {
      description: "Simulando flujo de pago simplificado"
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full relative overflow-x-hidden"
          >
            <HeroSection onNavigate={setCurrentPage} />
            <Cta4 onButtonClick={() => setCurrentPage('catalog')} />
            <HeroWithMarquee onNavigate={setCurrentPage} />
            <div id="ofertas-section">
              <FeaturedProducts onNavigate={setCurrentPage} />
            </div>

            <div id="nosotros-section">
              <AnimatedHeroSection onNavigate={setCurrentPage} />
            </div>
            <CategoryGradientSection onNavigate={setCurrentPage} />
            <RecentlyViewedProducts 
              onAddToCart={handleAddToCart} 
              onBuyNow={handleBuyNow}
              onQuickView={handleQuickView} 
              onCompare={handleAddToCompare} 
              onClick={handleNavigateToPDP} 
            />
            
            <BrandsSection />
            
            <div id="soporte-section">
              <TestimonialsSection />
            </div>
            
            <section className="py-16 md:py-24 bg-titan-light">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
                   <div className="w-full lg:flex-1 text-center lg:text-left order-2 lg:order-1">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-titan-dark uppercase mb-4 md:mb-8 leading-[0.9] md:leading-none">
                      OFERTAS <span className="text-titan-orange">IRRESISTIBLES</span> <br className="hidden md:block" />
                      SÓLO ESTA SEMANA.
                    </h2>
                    <p className="text-gray-500 text-[11px] md:text-sm uppercase tracking-widest leading-relaxed md:leading-loose mb-8 md:mb-10 max-w-lg font-bold mx-auto lg:mx-0">
                      ¡No te lo pierdas! Renueva tu hogar con precios de fábrica. Envíos inmediatos a todas las islas. ¡Últimas unidades!
                    </p>
                    <button 
                      onClick={() => setCurrentPage('catalog')}
                      className="w-full md:w-auto bg-titan-orange text-white px-10 py-5 rounded-md text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-titan-orange-hover transition-all shadow-xl hover:scale-105 active:scale-95"
                    >
                      ¡Comprar Ahora!
                    </button>
                  </div>
                  <div className="w-full lg:flex-1 relative aspect-[4/3] md:aspect-square bg-white overflow-hidden border border-gray-100 rounded-md shadow-sm order-1 lg:order-2">
                    <img 
                      src="/mesa-gaming-pro1500-xl-fibra-carbono-luz-rgb-sound-muvip.jpg" 
                      alt="Luz Hogar Evolution" 
                      className="w-full h-full object-cover grayscale active:grayscale-0 transition-all duration-1000" 
                      loading="lazy" 
                    />
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-titan-orange p-3 md:p-4 rounded-full animate-pulse shadow-lg" />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        );
      case 'catalog':
        return (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CatalogPage 
              onAddToCart={handleAddToCart} 
              onBuyNow={handleBuyNow}
              onQuickView={handleQuickView} 
              onCompare={handleAddToCompare} 
              onClick={handleNavigateToPDP} 
            />
          </motion.div>
        );
      case 'pdp':
        return (
          <motion.div
            key="pdp"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductDetailPage 
              onAddToCart={handleAddToCart} 
              onBuyNow={handleBuyNow}
              onQuickView={handleQuickView} 
            />
          </motion.div>
        );
      case 'terms':
        return (
          <motion.div
            key="terms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Términos y Condiciones</h1>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
              <p>Bienvenido a Luz Hogar Canarias. Al acceder a nuestro sitio, aceptas cumplir con nuestros términos de servicio...</p>
              <p><strong>1. Envíos:</strong> Realizamos envíos exclusivamente al territorio de las Islas Canarias.</p>
              <p><strong>2. Precios:</strong> Todos los precios incluyen el IGIC correspondiente...</p>
            </div>
          </motion.div>
        );
      case 'privacy':
        return (
          <motion.div
            key="privacy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Política de Privacidad</h1>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
              <p>Tu privacidad es fundamental para nosotros. En esta política detallamos cómo tratamos tus datos personales...</p>
              <p><strong>Seguridad:</strong> Implementamos medidas de seguridad de alto nivel para proteger tu información en nuestras bases de datos.</p>
            </div>
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminDashboard />
          </motion.div>
        );
      case 'account':
        return (
          <motion.div
            key="account"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CustomerDashboard />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-titan-light">
      <Toaster position="bottom-right" closeButton richColors />
      {/* Scroll-based page switching logic simulation */}
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        cartItemCount={cartItems.length} 
        onNavigate={setCurrentPage}
      />
      
      <main className="flex-grow pt-[104px]">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <Footer />
      
      <QuickViewModal 
        isOpen={isQuickViewOpen} 
        product={quickViewProduct} 
        onClose={() => setIsQuickViewOpen(false)} 
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <BackToTopButton />
      
      <ComparisonTool 
        items={compareItems} 
        onRemove={handleRemoveFromCompare} 
        onClear={handleClearCompare}
        isOpen={isComparisonOpen}
        onToggle={() => setIsComparisonOpen(!isComparisonOpen)}
      />
      
      {/* Sidebar Navigation Button - Visible on both PC and mobile */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 md:left-4 z-[200]">
         <GlassButton 
           variant="orange"
           onClick={() => setCurrentPage('catalog')} 
           className={cn(
             "transition-all [writing-mode:vertical-lr] rotate-180 flex items-center justify-center gap-2 md:gap-4 py-6 md:py-8 !rounded-r-xl !rounded-l-none md:!rounded-full",
             currentPage === 'catalog' ? 'scale-105 md:scale-110 shadow-[0_0_30px_rgba(242,130,36,0.5)]' : 'opacity-90 md:opacity-80 hover:opacity-100'
           )}
           contentClassName="flex items-center gap-2 md:gap-4"
         >
           <span className="tracking-[0.3em] md:tracking-[0.5em] font-black italic text-[10px] md:text-sm">CATÁLOGO</span>
           <div className={cn(
             "h-1.5 w-1.5 md:h-2 md:w-2 rounded-full",
             currentPage === 'catalog' ? "bg-white animate-pulse" : "bg-white/50"
           )} />
         </GlassButton>
      </div>
    </div>
  );
}

