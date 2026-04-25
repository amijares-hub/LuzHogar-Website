import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Heart, 
  MapPin, 
  User, 
  LogOut, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Truck, 
  XCircle, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  ExternalLink,
  ChevronDown,
  Calendar,
  CreditCard,
  Camera,
  CheckSquare,
  Square,
  ShoppingBag,
  Info,
  Clock,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { toast } from 'sonner';

import { luzHogarMockProducts, LuzHogarProduct, mockOrders as titanMockOrders, MockOrder } from '@/src/mockData';

// --- Types ---

type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  { id: '1', type: 'Casa', street: 'Calle Triana 12', city: 'Las Palmas de Gran Canaria', postalCode: '35002', isDefault: true },
  { id: '2', type: 'Oficina', street: 'Avenida Marítima 5', city: 'Santa Cruz de Tenerife', postalCode: '38003', isDefault: false },
];

// --- Subcomponents ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all text-xs font-black uppercase tracking-widest",
      active 
        ? "bg-titan-orange text-white shadow-lg" 
        : "text-gray-400 hover:text-titan-dark hover:bg-titan-light"
    )}
  >
    <Icon className="h-4 w-4" />
    {label}
  </button>
);

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const styles = {
    Pendiente: "bg-amber-50 text-amber-600 border-amber-100",
    Enviado: "bg-blue-50 text-blue-600 border-blue-100",
    Entregado: "bg-titan-green/10 text-titan-green border-titan-green/20",
    Cancelado: "bg-rose-50 text-rose-600 border-rose-100"
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border", styles[status])}>
      {status}
    </span>
  );
};

// --- Main Component ---

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(null);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]); // We'll initialize from TITAN data shortly
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [postalCodeInput, setPostalCodeInput] = useState('');
  const [cpError, setCpError] = useState('');

  // Sync wishlist with mock data on mount
  useEffect(() => {
    const items = luzHogarMockProducts.slice(0, 3).map(p => ({
      id: parseInt(p.id.replace(/\D/g, '') || "1"),
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.image,
      category: p.category
    }));
    setWishlist(items);
  }, []);

  // --- Handlers ---

  const handleUpdateWishlistQty = (id: number, delta: number) => {
    setWishlist(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        if (newQty !== item.quantity) {
          toast.success("Cantidad actualizada", {
            description: `${item.name}: ${newQty} unidades`,
            icon: <Plus className="h-4 w-4" />
          });
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromWishlist = (id: number, name: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
    toast.error("Eliminado de la lista", {
      description: `${name} ya no está en tu lista de deseos.`,
      icon: <Trash2 className="h-4 w-4" />
    });
  };

  const handleCancelRequest = (orderId: string) => {
    toast.info("Solicitud enviada", {
      description: `Estamos procesando tu cancelación del pedido ${orderId}.`,
      icon: <XCircle className="h-4 w-4" />
    });
  };

  const handleAddressAction = (action: 'edit' | 'delete', type: string) => {
    toast.success(`Dirección ${action === 'edit' ? 'actualizada' : 'eliminada'}`, {
      description: `Los cambios en '${type}' se han guardado.`,
      icon: <MapPin className="h-4 w-4" />
    });
  };

  const handleUpdatePhoto = () => {
    toast("Actualizando foto de perfil...", {
      description: "Subiendo imagen al servidor de Titan Canarias.",
      icon: <Camera className="h-4 w-4 text-titan-orange" />
    });
  };

  const toggleStatusFilter = (status: OrderStatus) => {
    setStatusFilters(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const validateCP = (value: string) => {
    setPostalCodeInput(value);
    if (value.length > 0 && !value.startsWith('35') && !value.startsWith('38')) {
      setCpError("El envío solo está disponible para las Islas Canarias (C.P. 35xxx o 38xxx)");
    } else {
      setCpError("");
    }
  };

  const handleAddAllToCart = () => {
    toast.success(`${wishlist.length} productos añadidos al carrito`, {
      description: "Tu cesta corporativa ha sido actualizada con éxito.",
      icon: <ShoppingBag className="h-4 w-4" />,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row gap-12 min-h-[800px]">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 space-y-8">
        <div className="p-6 bg-white border border-gray-100 rounded-md shadow-sm">
          <div className="flex flex-col items-center gap-4 mb-8 text-center">
            <div className="relative group">
              <div className="h-20 w-20 rounded-full bg-titan-light flex items-center justify-center text-titan-orange border-2 border-gray-50 overflow-hidden shadow-inner font-sans">
                <span className="text-2xl font-black">JP</span>
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Avatar" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                />
              </div>
              <button 
                onClick={handleUpdatePhoto}
                className="absolute bottom-0 right-0 p-2 bg-titan-orange text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-2 border-white"
              >
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-tighter text-titan-dark">Juan Pérez</h3>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Premium Member - Canarias</p>
            </div>
          </div>
          <div className="space-y-2">
            <SidebarItem icon={Package} label="Mis Pedidos" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
            <SidebarItem icon={Heart} label="Lista de Deseos" active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
            <SidebarItem icon={MapPin} label="Direcciones" active={activeTab === 'addresses'} onClick={() => setActiveTab('addresses')} />
            <SidebarItem icon={User} label="Mi Cuenta" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-md transition-all text-xs font-black uppercase tracking-widest">
              <LogOut className="h-4 w-4" /> Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-titan-dark">Historial de Pedidos</h2>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-md border transition-all",
                    isFilterOpen ? "bg-titan-dark text-white border-titan-dark" : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 shadow-sm"
                  )}
                >
                  <Filter className="h-4 w-4" /> Filtros
                </button>
              </div>

              {isFilterOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-titan-light border border-gray-100 rounded-md p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estado del Pedido (Multi-select)</label>
                    <div className="flex flex-wrap gap-4 pt-2">
                       {['Pendiente', 'Enviado', 'Entregado'].map((status) => (
                         <label key={status} className="flex items-center gap-3 cursor-pointer group">
                           <div 
                             onClick={() => toggleStatusFilter(status as OrderStatus)}
                             className={cn(
                               "w-5 h-5 rounded border flex items-center justify-center transition-all",
                               statusFilters.includes(status as OrderStatus) ? "bg-titan-orange border-titan-orange text-white" : "bg-white border-gray-200 group-hover:border-titan-orange"
                             )}
                           >
                             {statusFilters.includes(status as OrderStatus) ? <CheckSquare className="h-3 w-3" /> : <Square className="h-3 w-3 text-transparent" />}
                           </div>
                           <span className="text-[11px] font-bold text-titan-dark uppercase tracking-wider">{status}</span>
                         </label>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rango de Fecha (Date Picker)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Inicio</span>
                        <input 
                          type="date" 
                          value={dateStart}
                          onChange={(e) => setDateStart(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-titan-dark text-[10px] font-black uppercase tracking-wider p-2 px-3 rounded-md outline-none focus:ring-1 focus:ring-titan-orange"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Fin</span>
                        <input 
                          type="date" 
                          value={dateEnd}
                          onChange={(e) => setDateEnd(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-titan-dark text-[10px] font-black uppercase tracking-wider p-2 px-3 rounded-md outline-none focus:ring-1 focus:ring-titan-orange"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-titan-light border-b border-gray-100">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">ID Pedido</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Fecha</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Total</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Estado</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {titanMockOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-titan-light/50 transition-colors group">
                          <td className="px-6 py-5">
                            <span className="text-[11px] font-black text-titan-dark">{order.id}</span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="h-3 w-3" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">{order.date}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-[11px] font-black text-titan-dark">${order.total.toFixed(2)}</span>
                          </td>
                          <td className="px-6 py-5">
                            <StatusBadge status={order.status as OrderStatus} />
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end items-center gap-2">
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="p-2 text-gray-400 hover:text-titan-dark transition-colors"
                                title="Ver Detalles"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <div className="relative inline-block text-left">
                                <button className="p-2 text-gray-400 hover:text-titan-dark transition-colors">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                                <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-100 rounded-md shadow-2xl z-20 py-2">
                                   <button 
                                     onClick={() => setSelectedOrder(order)}
                                     className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-titan-light hover:text-titan-dark transition-all flex items-center gap-2"
                                   >
                                     <Eye className="h-3 w-3" /> Ver Detalles
                                   </button>
                                   <button className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-titan-light hover:text-titan-dark transition-all flex items-center gap-2">
                                     <Truck className="h-3 w-3" /> Rastrear Envío
                                   </button>
                                   <button 
                                     onClick={() => handleCancelRequest(order.id)}
                                     className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-2"
                                   >
                                     <XCircle className="h-3 w-3" /> Solicitar Cancelación
                                   </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-titan-dark">Lista de Deseos</h2>
                <button 
                  onClick={handleAddAllToCart}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-titan-orange text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-xl hover:bg-titan-orange-hover active:scale-95 transition-all w-full sm:w-auto"
                >
                  <ShoppingBag className="h-4 w-4" /> Añadir Todo al Carrito
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlist.map((item) => (
                  <div key={item.id} className="group bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-square overflow-hidden bg-titan-light">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <button 
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">{item.category}</p>
                      <h3 className="text-sm font-bold text-titan-dark mb-4 leading-tight group-hover:text-titan-orange transition-colors">{item.name}</h3>
                      <p className="text-lg font-black text-titan-dark mb-6">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between gap-4 mb-6 pt-6 border-t border-gray-50">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Cantidad</span>
                        <div className="flex items-center gap-4 bg-titan-light px-3 py-1.5 rounded-sm">
                          <button 
                            onClick={() => handleUpdateWishlistQty(item.id, -1)}
                            className="text-gray-400 hover:text-titan-dark transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-black text-titan-dark w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateWishlistQty(item.id, 1)}
                            className="text-gray-400 hover:text-titan-dark transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <button className="w-full bg-titan-dark text-white py-4 rounded-md text-[10px] font-black uppercase tracking-[0.2em] hover:bg-titan-orange transition-all flex items-center justify-center gap-2">
                        <Plus className="h-3 w-3" /> Añadir al Carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'addresses' && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-titan-dark">Mis Direcciones</h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-titan-orange text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg hover:bg-titan-orange-hover transition-all">
                  <Plus className="h-4 w-4" /> Nueva Dirección
                </button>
              </div>

              <div className="bg-titan-light p-8 rounded-md border border-gray-100 flex items-start gap-4 mb-10">
                <Info className="h-5 w-5 text-titan-orange shrink-0 mt-0.5" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 leading-relaxed">
                  Recordatorio: Los envíos directos de <span className="text-titan-dark">Titan Canarias</span> están limitados exclusivamente al archipiélago. Verifique siempre su código postal antes de finalizar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {addresses.map((address) => (
                  <div key={address.id} className="p-8 bg-white border border-gray-100 rounded-md shadow-sm relative group hover:border-titan-orange transition-all duration-300">
                    {address.isDefault && (
                      <span className="absolute top-8 right-8 bg-titan-green/10 text-titan-green text-[8px] font-black uppercase tracking-widest py-1 px-2 rounded-sm border border-titan-green/20">
                        Principal
                      </span>
                    )}
                    <MapPin className="h-7 w-7 text-titan-orange mb-6" />
                    <h3 className="text-sm font-bold text-titan-dark uppercase tracking-tight mb-2">{address.type}</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed mb-6">
                      {address.street}<br />
                      {address.postalCode}, {address.city}
                    </p>
                    <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
                      <button 
                        onClick={() => handleAddressAction('edit', address.type)}
                        className="text-[10px] font-black uppercase tracking-widest text-titan-orange hover:underline"
                      >
                        Editar
                      </button>
                      <button 
                         onClick={() => handleAddressAction('delete', address.type)}
                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-rose-500"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-100 rounded-md p-10 mt-12 shadow-sm">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" /> Formulario de Registro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Dirección Completa *</label>
                    <input placeholder="Ej: Calle Triana, 12" type="text" className="w-full bg-titan-light border-b border-gray-200 p-4 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-titan-orange transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ciudad *</label>
                    <input placeholder="Ej: Las Palmas" type="text" className="w-full bg-titan-light border-b border-gray-200 p-4 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-titan-orange transition-colors" />
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Código Postal * (Validación Canaria)</label>
                    <input 
                      value={postalCodeInput}
                      onChange={(e) => validateCP(e.target.value)}
                      placeholder="35XXX o 38XXX" 
                      type="text" 
                      maxLength={5}
                      className={cn(
                        "w-full bg-titan-light border-b p-4 text-[11px] font-black tracking-[0.2em] outline-none transition-colors",
                        cpError ? "border-rose-500 text-rose-500" : "border-gray-200 focus:border-titan-orange"
                      )} 
                    />
                    <AnimatePresence>
                      {cpError && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[9px] text-rose-500 font-bold uppercase tracking-widest mt-3 flex items-center gap-2"
                        >
                          <XCircle className="h-3 w-3" /> {cpError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-black uppercase tracking-tighter text-titan-dark mb-8">Información Personal</h2>
              <div className="bg-white border border-gray-100 rounded-md shadow-sm p-10 max-w-2xl">
                <form className="space-y-8">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre</label>
                        <input defaultValue="Juan" type="text" className="w-full bg-titan-light border border-gray-100 p-4 text-sm font-bold rounded-sm outline-none focus:border-titan-orange" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Apellidos</label>
                        <input defaultValue="Pérez" type="text" className="w-full bg-titan-light border border-gray-100 p-4 text-sm font-bold rounded-sm outline-none focus:border-titan-orange" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</label>
                      <input defaultValue="juan.perez@example.com" type="email" className="w-full bg-titan-light border border-gray-100 p-4 text-sm font-bold rounded-sm outline-none focus:border-titan-orange" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Teléfono</label>
                      <input defaultValue="+34 600 000 000" type="tel" className="w-full bg-titan-light border border-gray-100 p-4 text-sm font-bold rounded-sm outline-none focus:border-titan-orange" />
                   </div>
                   
                   <div className="pt-6">
                    <button 
                      type="button"
                      onClick={() => toast.success("Perfil actualizado", { description: "Tus datos se han guardado correctamente." })}
                      className="bg-titan-dark text-white px-8 py-4 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-titan-orange transition-all shadow-lg"
                    >
                      Guardar Cambios
                    </button>
                   </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Slide-over for Order Details */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[300] flex justify-end">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedOrder(null)}
               className="absolute inset-0 bg-titan-dark/60 backdrop-blur-md"
            />
            <motion.aside
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="relative h-screen w-full max-w-xl bg-white z-[310] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter text-titan-dark">Detalles del Pedido</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-3 bg-titan-light rounded-full text-titan-dark hover:bg-titan-orange hover:text-white transition-all shadow-sm"
                >
                  <Eye className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12 font-sans">
                
                {/* Visual Timeline Stepper */}
                <div className="space-y-12">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-titan-orange flex items-center gap-2">
                    <Truck className="h-4 w-4" /> Línea de Tiempo del Envío
                  </h4>
                  
                  <div className="relative">
                     {/* Dynamic Connector */}
                     <div className="absolute left-[19px] top-4 bottom-4 w-1 bg-gray-100 z-0 rounded-full" />
                     
                     <div className="space-y-12 relative z-10">
                        {selectedOrder.timeline.map((step, i) => {
                          const StepIcon = i === 0 ? ClipboardList : i === 1 ? Clock : i === 2 ? Truck : CheckSquare;
                          return (
                            <div key={i} className="flex gap-10 group">
                               <div className={cn(
                                 "h-10 w-10 rounded-full border-4 border-white shadow-xl flex items-center justify-center shrink-0 transition-all duration-500",
                                 step.completed ? "bg-titan-green text-white scale-110 shadow-titan-green/20" : "bg-gray-100 text-gray-300"
                               )}>
                                 <StepIcon className="h-4 w-4" />
                               </div>
                               <div className="flex-1 pt-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className={cn(
                                      "text-xs font-black uppercase tracking-widest",
                                      step.completed ? "text-titan-dark" : "text-gray-300"
                                    )}>
                                      {step.step}
                                    </p>
                                    {step.completed && <CheckSquare className="h-3 w-3 text-titan-green" />}
                                  </div>
                                  <div className="flex gap-4">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{step.timestamp || 'Pendiente'}</span>
                                  </div>
                               </div>
                            </div>
                          );
                        })}
                     </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-8 bg-titan-light/30 p-8 rounded-md border border-titan-light">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resumen de Productos</h4>
                  <div className="space-y-6">
                    {selectedOrder.products.map((item, i) => (
                      <div key={i} className="flex gap-6 items-center group">
                        <div className="h-20 w-20 bg-white rounded-md overflow-hidden shrink-0 border border-gray-100 shadow-sm group-hover:border-titan-orange transition-colors">
                          <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-[11px] font-black uppercase tracking-tighter text-titan-dark mb-1">{item.name}</h5>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cant: {item.quantity} x ${item.price.toFixed(2)}</p>
                        </div>
                        <span className="text-[11px] font-black text-titan-dark">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Blocks */}
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Envío a</h4>
                    <p className="text-[10px] font-bold text-titan-dark uppercase tracking-wide leading-relaxed p-4 bg-titan-light/50 rounded-sm">
                      {selectedOrder.address}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Método de Pago</h4>
                    <div className="flex items-center gap-3 p-4 bg-titan-light/50 rounded-sm">
                       <CreditCard className="h-4 w-4 text-titan-orange" />
                       <p className="text-[10px] font-bold text-titan-dark uppercase tracking-wide">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Totals Section */}
                <div className="space-y-4 bg-titan-dark text-white p-10 rounded-md shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <ShoppingBag className="h-32 w-32" />
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 relative z-10">
                     <span>Subtotal</span>
                     <span>${(selectedOrder.total * 0.93).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 relative z-10">
                     <span>Logística Canarias</span>
                     <span className="text-titan-orange">Gratis</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 relative z-10">
                     <span>IGIC (7%)</span>
                     <span>${(selectedOrder.total * 0.07).toFixed(2)}</span>
                   </div>
                   <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                     <span className="text-sm font-black uppercase tracking-tighter font-sans">Total Pagado</span>
                     <span className="text-3xl font-black tracking-tighter text-titan-orange font-sans">${selectedOrder.total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="pt-10 space-y-4">
                   <button className="w-full bg-titan-orange text-white py-5 rounded-md text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-titan-orange-hover transition-all shadow-xl">
                     <ExternalLink className="h-4 w-4" /> Descargar Factura (PDF)
                   </button>
                   <button className="w-full border border-gray-100 text-gray-400 py-4 rounded-md text-[9px] font-black uppercase tracking-[0.3em] hover:text-titan-dark hover:border-gray-300 transition-all">
                     ¿Necesitas ayuda con este pedido?
                   </button>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
