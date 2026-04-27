import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, LogIn, UserCircle, LogOut, Command, LayoutDashboard, MapPin, Package, Facebook, Instagram, Twitter, Linkedin, Shield, Monitor, Tv, Zap, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { LuzHogarProduct, luzHogarMockProducts } from '@/src/mockData';

interface NavbarProps {
  onOpenCart: () => void;
  cartItemCount: number;
  onNavigate?: (page: any, category?: string) => void;
}

export default function Navbar({ onOpenCart, cartItemCount, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LuzHogarProduct[]>([]);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const productResults = luzHogarMockProducts.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      ).slice(0, 5);
      
      const categoryResults = Array.from(new Set(luzHogarMockProducts.map(p => p.category)))
        .filter(c => c.toLowerCase().includes(q))
        .slice(0, 3);

      setSearchResults(productResults);
      setSuggestedCategories(categoryResults);
    } else {
      setSearchResults([]);
      setSuggestedCategories([]);
    }
  }, [searchQuery]);

  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate?.('catalog');
    }
  };

  const desktopNavLinks = [
    { name: 'GRAN ELECTRO', section: 'catalog', category: 'Gran Electro', icon: <Monitor className="h-3.5 w-3.5" /> },
    { name: 'IMAGEN Y SONIDO', section: 'catalog', category: 'Imagen y Sonido', icon: <Tv className="h-3.5 w-3.5" /> },
    { name: 'PEQUEÑO ELECTRO', section: 'catalog', category: 'Pequeño Electro', icon: <Zap className="h-3.5 w-3.5" /> },
    { name: 'CLIMATIZACIÓN', section: 'catalog', category: 'Climatización', icon: <Wind className="h-3.5 w-3.5" /> },
  ];

  return (
    <>
      <div className="fixed top-0 z-[60] w-full bg-titan-orange py-2 text-center text-white overflow-hidden">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.2em] px-2 leading-tight">
          Venta exclusivamente en Canarias <span className="hidden md:inline">—</span> <br className="md:hidden" /> <span className="italic">Porque somos de AQUÍ</span>
        </p>
      </div>
      <nav className={cn(
        "fixed top-10 z-50 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl border-gray-200 py-3 shadow-sm" 
          : "bg-white border-gray-100 py-5"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Left: Logo */}
          <div className="flex items-center gap-12">
            <button 
              onClick={() => onNavigate?.('home')} 
              className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden hover:scale-110 transition-all shadow-md border border-gray-100 shrink-0"
            >
              <img src="/luzhogar%20logo.jpg" alt="Luz Hogar Logo" className="w-[85%] h-[85%] object-contain" />
            </button>
            
          {/* Center: Desktop Row */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-6">
              {desktopNavLinks.map((link: any) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.section === 'catalog') {
                      onNavigate?.('catalog', link.category);
                    } else {
                      handleScrollToSection(link.section);
                    }
                  }}
                  className={cn(
                    "relative text-[11px] font-black uppercase tracking-[0.2em] transition-colors py-2 text-gray-500 hover:text-titan-dark italic group flex items-center gap-2"
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-titan-orange"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </button>
              ))}
            </div>
          </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Spotlight Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 md:p-3 text-titan-dark hover:text-titan-orange transition-all relative group"
              aria-label="Buscar productos"
              title="Buscar productos (Cmd+K)"
            >
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Auth Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                className="p-1 md:p-3 text-titan-dark hover:text-titan-orange transition-all relative group"
                aria-label="Mi Cuenta"
                title="Mi Cuenta"
              >
                <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <AnimatePresence>
                {isAuthMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-[60]"
                  >
                    {isLoggedIn ? (
                      <>
                        <button 
                          onClick={() => { onNavigate?.('account'); setIsAuthMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-widest text-gray-600 hover:text-titan-orange hover:bg-titan-light rounded-md transition-all"
                        >
                          <UserCircle className="h-4 w-4" /> Mi Cuenta
                        </button>
                        <button 
                          onClick={() => { onNavigate?.('admin'); setIsAuthMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-widest text-titan-orange hover:bg-titan-orange/10 rounded-md transition-all font-black"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Admin Panel
                        </button>
                        <button 
                          onClick={() => setIsLoggedIn(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-widest text-red-600 hover:bg-red-50 rounded-md transition-all"
                        >
                          <LogOut className="h-4 w-4" /> Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => { setIsLoggedIn(true); setIsAuthMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-widest text-gray-500 hover:text-titan-orange hover:bg-titan-light rounded-md transition-all"
                        >
                          <LogIn className="h-4 w-4" /> Iniciar Sesión
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-widest text-white font-black bg-titan-orange hover:bg-titan-orange-hover rounded-md transition-all">
                          Registrarse
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Help Buttons */}
            <div className="hidden lg:flex items-center gap-1">
              <button className="group flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-titan-dark hover:text-titan-orange transition-all">
                <Package className="h-4 w-4 text-gray-400 group-hover:text-titan-orange group-hover:scale-110 transition-all" strokeWidth={2} />
                Rastrea tu pedido
              </button>
              <div className="h-4 w-px bg-gray-200" />
              <button className="group flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-titan-dark hover:text-titan-orange transition-all">
                <MapPin className="h-4 w-4 text-gray-400 group-hover:text-titan-orange group-hover:scale-110 transition-all" strokeWidth={2} />
                Dónde estamos ubicados
              </button>
            </div>

            {/* Cart Toggle */}
            <button 
              onClick={onOpenCart}
              className="relative p-1 md:p-0 text-titan-dark hover:text-titan-orange transition-colors"
            >
              <ShoppingCart className="h-5 w-5 stroke-[2]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-titan-orange text-[9px] font-black text-white border border-white shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-900 transition-colors hover:text-orange-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 stroke-[2]" /> : <Menu className="h-6 w-6 stroke-[2]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 md:hidden z-40 shadow-xl overflow-y-auto max-h-[80vh]"
            >
              <div className="flex flex-col p-8 space-y-6">
                {desktopNavLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => { 
                      if (link.section === 'catalog') {
                        onNavigate?.('catalog', link.category);
                      } else {
                        handleScrollToSection(link.section);
                      }
                      setIsMobileMenuOpen(false); 
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "text-xl font-bold uppercase tracking-[0.1em] text-left text-titan-dark flex items-center gap-4"
                    )}
                  >
                    <span className="text-titan-orange">{link.icon}</span>
                    {link.name}
                  </motion.button>
                ))}
                
                <div className="pt-6 border-t border-gray-50 flex flex-col gap-4">
                  <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <Package className="h-5 w-5 text-titan-orange" />
                    Rastrea tu pedido
                  </button>
                  <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <MapPin className="h-5 w-5 text-titan-orange" />
                    Dónde estamos
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spotlight Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[5vh] md:pt-[15vh]">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl mx-4 bg-white border border-gray-200 rounded-md shadow-2xl overflow-hidden"
            >
              <div className="flex items-center px-6 border-b border-gray-100">
                <Search className="h-5 w-5 text-gray-400" />
                <input 
                  autoFocus
                  placeholder="Busca en Luz Hogar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-titan-dark p-6 text-sm placeholder:text-gray-400 font-bold uppercase tracking-wider"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="px-2 py-1 rounded bg-titan-light border border-gray-100 text-[9px] uppercase font-black tracking-widest text-gray-500 shadow-sm"
                >
                  ESC
                </button>
              </div>
              <div className="p-4 bg-titan-light text-[10px] uppercase tracking-widest text-gray-400 font-black flex justify-between items-center">
                <span>{searchQuery.length > 1 ? 'Resultados de búsqueda' : 'Sugerencias para ti'}</span>
                {searchQuery.length > 1 && (
                  <span className="text-[9px] bg-white border border-gray-200 px-2 py-0.5 rounded-full text-titan-orange">
                    {searchResults.length} Productos
                  </span>
                )}
              </div>
              <div className="p-2 max-h-[500px] overflow-y-auto scrollbar-hide">
                {/* Categories */}
                {suggestedCategories.length > 0 && (
                  <div className="mb-4">
                    <div className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">Colecciones</div>
                    {suggestedCategories.map(cat => (
                      <div 
                        key={cat}
                        onClick={() => { onNavigate?.('catalog'); setIsSearchOpen(false); setSearchQuery(''); }}
                        className="px-4 py-3 rounded-md hover:bg-titan-orange/5 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <span className="text-[11px] font-bold text-titan-dark group-hover:text-titan-orange uppercase tracking-wider">{cat}</span>
                        <Command className="h-3 w-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Products */}
                <div className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">Innovación</div>
                {(searchQuery.length > 1 ? searchResults : luzHogarMockProducts.slice(0, 3)).map(product => (
                  <div 
                    key={product.id}
                    onClick={() => { 
                      onNavigate?.('pdp'); 
                      setIsSearchOpen(false); 
                      setSearchQuery('');
                    }}
                    className="p-4 rounded-md hover:bg-titan-orange/5 cursor-pointer transition-colors group flex items-center gap-4"
                  >
                    <div className="w-14 h-14 bg-gray-50 rounded overflow-hidden shrink-0 border border-gray-100">
                      <img src={product.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[11px] font-black text-titan-dark group-hover:text-titan-orange uppercase tracking-tight transition-colors">{product.name}</h4>
                        <span className="text-[10px] font-black text-titan-dark">{product.price}€</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">{product.category} • {product.brand}</p>
                    </div>
                  </div>
                ))}
                
                {searchQuery.length > 1 && searchResults.length === 0 && (
                  <div className="p-12 text-center">
                    <div className="inline-block p-4 rounded-full bg-titan-light mb-4">
                      <Search className="h-6 w-6 text-gray-300" />
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">No se encontraron productos en el archipiélago</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
