import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { LuzHogarProduct, luzHogarMockProducts } from '@/src/mockData';

const SUBCATEGORIES: Record<string, { name: string; image: string }[]> = {
  "Gran Electro": [
    { name: "Frío", image: "/vinoteca-10-botellas-65w-56cm-muvip.jpg" },
    { name: "Lavado", image: "/lavadora-10kg-1400rpm-candy.jpg" },
    { name: "Encastre", image: "/placa-vitroceramica-4-focos-teka.jpg" },
    { name: "Cocinas", image: "/cocina-de-gas-1-fuego-serie-vulcano-muvip.jpg" },
    { name: "Microondas", image: "/microondas-teka-integrable-25-l.jpg" }
  ],
  "Imagen y Sonido": [
    { name: "Television", image: "https://images.unsplash.com/photo-1593359677770-4669502a35b0?auto=format&fit=crop&q=80&w=300" },
    { name: "Webcams", image: "https://images.unsplash.com/photo-1587820849302-1296851963c8?auto=format&fit=crop&q=80&w=300" },
    { name: "Stick TV", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300" },
    { name: "Periféricos", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=300" },
    { name: "Auriculares", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300" },
    { name: "Gaming", image: "/mesa-gaming-pro1500-xl-fibra-carbono-luz-rgb-sound-muvip.jpg" },
    { name: "Micrófonos", image: "/microfono-gaming-usb-mmicx-blanco-mars-gaming.jpg" },
    { name: "Altavoces", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=300" },
    { name: "Sportcams", image: "https://images.unsplash.com/photo-1502931210244-73c056222558?auto=format&fit=crop&q=80&w=300" },
    { name: "Antenas TV", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300" },
    { name: "Radios", image: "/radio-portatil-am-fm-dial-clasico-negra-gen-x.jpg" }
  ],
  "Pequeño Electro": [
    { name: "Cuidado Personal", image: "https://images.unsplash.com/photo-1522338140262-f46f5912018a?auto=format&fit=crop&q=80&w=300" },
    { name: "Cocina", image: "/cocina-de-induccion-1-fuego-2000w-muvip.jpg" },
    { name: "Hogar", image: "https://images.unsplash.com/photo-1558317374-067df5f15430?auto=format&fit=crop&q=80&w=300" },
    { name: "Camping", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=300" },
    { name: "Bienestar Sexual", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=300" }
  ],
  "Climatización": [
    { name: "Humidificadores", image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=300" },
    { name: "Calentadores", image: "https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&q=80&w=300" },
    { name: "Calefacción", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=300" },
    { name: "Aire Acondicionado", image: "https://images.unsplash.com/photo-1631541486241-11881729b9f3?auto=format&fit=crop&q=80&w=300" },
    { name: "Ventiladores", image: "https://images.unsplash.com/photo-1618330834871-dd22c2c22ca7?auto=format&fit=crop&q=80&w=300" }
  ]
};

export default function CatalogPage({ onAddToCart, onBuyNow, onQuickView, onCompare, onClick, initialCategory }: { onAddToCart: (product: LuzHogarProduct, quantity?: number) => void, onBuyNow?: (product: LuzHogarProduct, quantity?: number) => void, onQuickView?: (product: LuzHogarProduct) => void, onCompare?: (product: LuzHogarProduct) => void, onClick?: (product: LuzHogarProduct) => void, initialCategory?: string | null }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['categories']);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedEnergyClasses, setSelectedEnergyClasses] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const categories = Array.from(new Set(luzHogarMockProducts.map(p => p.category)));
  const brands = Array.from(new Set(luzHogarMockProducts.map(p => p.brand)));
  const energyClasses = Array.from(new Set(luzHogarMockProducts.map(p => p.specs["Clase Energética"]).filter(Boolean) as string[]));

  const filteredProducts = luzHogarMockProducts.filter(p => {
    if (showOnlyInStock && p.stock <= 0) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedEnergyClasses.length > 0 && (!p.specs["Clase Energética"] || !selectedEnergyClasses.includes(p.specs["Clase Energética"]))) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  const sortOptions = [
    { value: 'relevance', label: 'Más Relevantes' },
    { value: 'price-high', label: 'Precio Mayor' },
    { value: 'price-low', label: 'Precio Menor' },
    { value: 'new', label: 'Novedades' },
  ];

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-high': return b.price - a.price;
      case 'price-low': return a.price - b.price;
      case 'new': return b.id.localeCompare(a.id); // Assuming ID or adding a date field would be better, but we only have ID here
      default: return 0; // relevance
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const pagedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFilter = (id: string) => {
    setExpandedFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [id]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    // Collapse other filters when a category is selected for mobile focus
    setExpandedFilters(['categories']);
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const toggleEnergyClass = (ec: string) => {
    setSelectedEnergyClasses(prev => 
      prev.includes(ec) ? prev.filter(e => e !== ec) : [...prev, ec]
    );
  };

  const FilterSection = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <div className="border-b border-gray-100 py-6">
      <button 
        onClick={() => toggleFilter(id)}
        className="flex items-center justify-between w-full text-[10px] uppercase font-black tracking-[0.3em] text-titan-dark hover:text-titan-orange transition-colors"
      >
        {title}
        {expandedFilters.includes(id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <AnimatePresence>
        {expandedFilters.includes(id) && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Get current subcategories based on first selected category
  const activeCategory = selectedCategories.length === 1 ? selectedCategories[0] : null;
  const activeSubcategories = activeCategory ? SUBCATEGORIES[activeCategory] || [] : [];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 bg-white">
      {/* Mobile Filter Trigger */}
      <div className="flex md:hidden items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-black uppercase tracking-tighter text-titan-dark">Explorar</h2>
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-titan-orange text-white px-4 py-2 rounded-md shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </button>
      </div>

      <div className="flex gap-16">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-10">Filtros</h2>
            
            <FilterSection id="status" title="Disponibilidad">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs text-gray-400 group-hover:text-titan-dark transition-colors uppercase tracking-widest font-bold">Solo en Stock</span>
                <div 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowOnlyInStock(!showOnlyInStock);
                  }}
                  className={cn(
                    "w-10 h-5 rounded-full p-1 transition-colors relative",
                    showOnlyInStock ? "bg-titan-green" : "bg-gray-200"
                  )}
                >
                  <motion.div 
                    animate={{ x: showOnlyInStock ? 20 : 0 }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                </div>
              </label>
            </FilterSection>

            <FilterSection id="categories" title="Categorías">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="form-checkbox bg-gray-50 border-gray-200 rounded-sm h-4 w-4 text-titan-orange focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer" 
                  />
                  <span className="text-xs text-gray-400 group-hover:text-titan-dark transition-colors uppercase tracking-widest font-bold">{cat}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection id="brands" title="Marcas">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="form-checkbox bg-gray-50 border-gray-200 rounded-sm h-4 w-4 text-titan-orange focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer" 
                  />
                  <span className="text-xs text-gray-400 group-hover:text-titan-dark transition-colors uppercase tracking-widest font-bold">{brand}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection id="energy" title="Clase Energética">
              <div className="flex flex-wrap gap-2">
                {energyClasses.sort().map(ec => (
                  <button 
                    key={ec}
                    onClick={() => toggleEnergyClass(ec)}
                    className={cn(
                      "px-3 py-1.5 border text-[10px] font-black transition-all rounded-sm",
                      selectedEnergyClasses.includes(ec) ? "bg-titan-dark text-white border-titan-dark" : "border-gray-100 text-gray-400 hover:border-titan-orange"
                    )}
                  >
                    {ec}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection id="price" title="Precio">
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  title="Rango de precio"
                  aria-label="Filtrar por rango de precio"
                  className="w-full h-1 bg-gray-100 appearance-none cursor-pointer accent-titan-orange" 
                />
                <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  <span>$0</span>
                  <span className="text-titan-dark">Max: ${priceRange}</span>
                  <span>$1,000+</span>
                </div>
              </div>
            </FilterSection>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          {/* Subcategory Gallery */}
          <AnimatePresence mode="wait">
            {activeCategory && activeSubcategories.length > 0 && (
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-16 pb-12 border-b border-gray-50"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-black tracking-tighter text-titan-dark uppercase">{activeCategory}</h2>
                    <p className="text-[10px] text-titan-orange uppercase tracking-[0.2em] font-black mt-1">Explorar Subcategorías</p>
                  </div>
                </div>

                <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-5">
                  {activeSubcategories.map(sub => (
                    <motion.div 
                      key={sub.name}
                      whileHover={{ y: -5 }}
                      className="flex-shrink-0 w-32 md:w-auto group cursor-pointer"
                    >
                      <div className="aspect-square bg-gray-50 rounded-md overflow-hidden border border-gray-100 group-hover:border-titan-orange/30 group-hover:shadow-xl group-hover:shadow-titan-orange/5 transition-all duration-500 relative">
                        <img 
                          src={sub.image} 
                          alt={sub.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-titan-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="mt-4 text-[9px] font-black uppercase tracking-widest text-titan-dark text-center group-hover:text-titan-orange transition-colors">
                        {sub.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-titan-dark uppercase mb-2 font-sans">
                {activeCategory ? `Productos de ${activeCategory}` : "Todo el Catálogo"}
              </h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Mostrando {filteredProducts.length} productos en Canarias</p>
            </div>
            
            <div className="flex items-center gap-6 relative">
              <div className="relative">
                <button 
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center gap-4 border-b border-gray-200 py-1 min-w-[160px] justify-between group hover:border-titan-orange transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-start translate-y-[-2px]">
                     <span className="text-[8px] text-gray-400 uppercase tracking-widest font-black">Ordenar por</span>
                     <span className="text-[10px] text-titan-dark uppercase tracking-widest font-bold">
                       {sortOptions.find(o => o.value === sortBy)?.label}
                     </span>
                  </div>
                  <ChevronDown className={cn("h-3 w-3 text-gray-400 transition-transform duration-300", isSortDropdownOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isSortDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsSortDropdownOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-100 rounded-lg shadow-2xl z-50 p-1.5 overflow-hidden"
                      >
                        {sortOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-3 text-[9px] font-black uppercase tracking-widest rounded-md transition-all flex items-center justify-between group/opt",
                              sortBy === option.value ? "bg-titan-orange text-white shadow-md shadow-orange-200" : "text-gray-500 hover:bg-titan-light hover:text-titan-dark"
                            )}
                          >
                            <span>{option.label}</span>
                            {sortBy === option.value && <Check className="h-3 w-3" />}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 animation-fade-in-up">
            {pagedProducts.map(product => (
              <div key={product.id}>
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onBuyNow={onBuyNow}
                  onQuickView={onQuickView} 
                  onCompare={onCompare} 
                  onClick={onClick} 
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-gray-100 pt-12">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Por página:</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  handlePageChange(1);
                }}
                title="Productos por página"
                aria-label="Seleccionar cantidad de productos por página"
                className="bg-transparent border-b border-gray-200 text-titan-dark text-[11px] uppercase tracking-widest font-bold py-1 pr-6 focus:ring-0 focus:border-titan-orange cursor-pointer appearance-none"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-gray-100 rounded hover:bg-titan-dark hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                >
                  Anterior
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={cn(
                        "w-8 h-8 text-[10px] font-black rounded flex items-center justify-center transition-all",
                        currentPage === i + 1 ? "bg-titan-dark text-white" : "hover:bg-titan-light text-gray-400"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-gray-100 rounded hover:bg-titan-dark hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence mode="wait">
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-[100] flex justify-start">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileFiltersOpen(false)}
               className="absolute inset-0 bg-titan-dark/40 backdrop-blur-md"
            />
            <motion.aside
               initial={{ x: '-100%' }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="relative h-screen w-[85%] bg-white z-[110] flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-black uppercase tracking-tighter text-titan-dark">Filtros</h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  title="Cerrar filtros"
                  aria-label="Cerrar menú de filtros"
                  className="p-2 bg-titan-light rounded-full text-titan-dark hover:bg-titan-orange hover:text-white transition-all shadow-sm"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-2">
                <FilterSection id="status" title="Disponibilidad">
                   <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs text-titan-dark uppercase tracking-widest font-bold">Solo en Stock</span>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowOnlyInStock(!showOnlyInStock);
                      }}
                      className={cn(
                        "w-12 h-6 rounded-full p-1 transition-colors relative",
                        showOnlyInStock ? "bg-titan-green" : "bg-gray-200"
                      )}
                    >
                      <motion.div 
                        animate={{ x: showOnlyInStock ? 24 : 0 }}
                        className="w-4 h-4 bg-white rounded-full"
                      />
                    </div>
                  </label>
                </FilterSection>

                <FilterSection id="categories" title="Categorías">
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => toggleCategory(cat)}
                        className={cn(
                          "w-full px-4 py-4 border text-[10px] uppercase tracking-widest font-black transition-all rounded-md text-left flex justify-between items-center group",
                          selectedCategories.includes(cat) ? "bg-titan-orange border-titan-orange text-white shadow-lg" : "border-gray-100 bg-titan-light text-gray-500 hover:border-titan-orange"
                        )}
                      >
                        {cat}
                        {selectedCategories.includes(cat) && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection id="price" title="Rango de Precio">
                  <div className="pt-4 px-2">
                    <input 
                      type="range" 
                      min="0"
                      max="1000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      title="Rango de precio"
                      aria-label="Filtrar por rango de precio"
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-titan-orange" 
                    />
                    <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest mt-4">
                      <span>$0</span>
                      <span className="text-titan-dark">Hasta ${priceRange}</span>
                      <span>$1,000+</span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection id="brands" title="Marcas">
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {brands.map(brand => (
                      <button 
                        key={brand} 
                        onClick={() => toggleBrand(brand)}
                        className={cn(
                          "px-4 py-4 border text-[9px] uppercase tracking-widest font-black transition-all rounded-md",
                          selectedBrands.includes(brand) ? "bg-titan-dark border-titan-dark text-white" : "border-gray-100 bg-white text-gray-400"
                        )}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              </div>

              <div className="sticky bottom-0 bg-white p-8 border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.1)]">
                <button 
                   onClick={() => setIsMobileFiltersOpen(false)}
                   className="w-full bg-titan-dark text-white py-5 rounded-md text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl active:scale-[0.98] transition-all hover:bg-titan-orange"
                >
                  Continuar con {filteredProducts.length} Productos
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
