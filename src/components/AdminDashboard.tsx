import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Plus,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inventory');

  const stats = [
    { title: 'Ventas Totales', value: '€42,890', change: '+12.5%', isUp: true, icon: ShoppingCart },
    { title: 'Pedidos', value: '156', change: '+18.2%', isUp: true, icon: Package },
    { title: 'Usuarios', value: '1,240', change: '-2.4%', isUp: false, icon: Users },
  ];

  const recentOrders = [
    { id: '#ORD-7821', customer: 'Juan Pérez', product: 'Luz Hogar Flex', status: 'Enviado', total: '€299.00', date: 'Hace 2h' },
    { id: '#ORD-7820', customer: 'María García', product: 'Multi-Tool Pro', status: 'Pendiente', total: '€145.00', date: 'Hace 5h' },
    { id: '#ORD-7819', customer: 'Carlos Ruiz', product: 'Luz Hogar Flex', status: 'Cancelado', total: '€299.00', date: 'Ayer' },
  ];

  return (
    <div className="flex bg-titan-light min-h-[calc(100vh-104px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col">
        <div className="p-8">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Panel Control', icon: LayoutDashboard },
              { id: 'inventory', label: 'Inventario', icon: Package },
              { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
              { id: 'customers', label: 'Clientes', icon: Users },
              { id: 'settings', label: 'Ajustes', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-md text-[11px] font-black uppercase tracking-widest transition-all",
                  activeTab === item.id 
                    ? "bg-titan-orange text-white shadow-sm" 
                    : "text-gray-400 hover:bg-titan-light hover:text-titan-dark"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-titan-orange/20 flex items-center justify-center">
              <span className="text-[10px] font-black text-titan-orange">AL</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-titan-dark tracking-widest uppercase">Admin Local</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Sasorilabs.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-titan-dark uppercase mb-2">Gestión de Inventario</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Panel de administración v1.0.4</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input 
                placeholder="BUSCAR..." 
                className="bg-white border border-gray-100 pl-10 pr-4 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-titan-orange focus:border-titan-orange transition-all w-64"
              />
            </div>
            <button className="p-3 bg-white border border-gray-100 rounded-md text-gray-400 hover:text-titan-orange transition-all relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-titan-orange rounded-full" />
            </button>
            <button className="flex items-center gap-2 bg-titan-orange text-white px-6 py-3 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-titan-orange-hover shadow-sm transition-all">
              <Plus className="h-4 w-4" /> Nuevo Item
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 border border-gray-100 rounded-md shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-titan-light rounded-md border border-gray-50 text-titan-orange">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                  stat.isUp ? "text-titan-green" : "text-red-500"
                )}>
                  {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.title}</p>
              <h3 className="text-2xl font-black text-titan-dark tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Tables/Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-titan-dark">Pedidos Recientes</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-titan-orange hover:underline">Ver Todo</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-titan-light">
                    {['ID', 'Cliente', 'Producto', 'Estado', 'Total'].map((head) => (
                      <th key={head} className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-widest text-gray-400">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-titan-light transition-colors group">
                      <td className="px-8 py-5 text-[10px] font-black text-titan-dark tracking-widest">{order.id}</td>
                      <td className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{order.customer}</td>
                      <td className="px-8 py-5 text-[10px] font-bold text-titan-dark uppercase tracking-widest">{order.product}</td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest",
                          order.status === 'Enviado' ? "bg-titan-green/10 text-titan-green" : 
                          order.status === 'Pendiente' ? "bg-titan-orange/10 text-titan-orange" : 
                          "bg-red-500/10 text-red-500"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-[10px] font-black text-titan-dark tracking-tighter">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions/Info */}
          <div className="space-y-8">
            <div className="bg-titan-dark p-8 rounded-md shadow-xl text-white">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                <Bell className="h-4 w-4 text-titan-orange" /> Alertas Críticas
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-md">
                  <p className="text-[10px] font-black text-titan-orange uppercase tracking-widest mb-1">Stock Bajo</p>
                  <p className="text-[9px] text-white/50 uppercase tracking-widest leading-loose">Quedan menos de 5 unidades de Titan Core L01 en almacén Tenerife.</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-md">
                  <p className="text-[10px] font-black text-titan-green uppercase tracking-widest mb-1">Envío Pendiente</p>
                  <p className="text-[9px] text-white/50 uppercase tracking-widest leading-loose">3 pedidos listos para despacho en Las Palmas.</p>
                </div>
              </div>
              <button className="w-full mt-8 py-4 bg-titan-orange text-white text-[10px] font-black uppercase tracking-widest hover:bg-titan-orange-hover transition-all rounded-sm shadow-lg">
                Gestionar Alertas
              </button>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-md shadow-sm">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-titan-dark mb-6">Próximos Pasos</h3>
               <div className="space-y-4">
                  {[
                    'Actualizar precios IGIC 2024',
                    'Revisar inventario Outdoor',
                    'Contactar logística Canarias'
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-5 h-5 border-2 border-gray-100 rounded-sm group-hover:border-titan-orange transition-all" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-titan-dark transition-colors">{task}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
