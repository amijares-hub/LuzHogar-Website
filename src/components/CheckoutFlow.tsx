import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, CreditCard, CheckCircle, ChevronRight, ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CheckoutFlowProps {
  onCancel: () => void;
  total: number;
}

type Step = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow({ onCancel, total }: CheckoutFlowProps) {
  const [step, setStep] = useState<Step>('shipping');
  const [formData, setFormData] = useState({
    name: 'Armando Mijares',
    email: 'armandomijaresgpt@gmail.com',
    address: 'Calle Real 45, Santa Cruz de Tenerife',
    city: 'Tenerife',
    zip: '38001'
  });
  const [zipError, setZipError] = useState('');

  const validateZip = (zip: string) => {
    if (zip.length >= 2 && !zip.startsWith('35') && !zip.startsWith('38')) {
      setZipError('Código postal no válido para Canarias (debe empezar por 35 o 38)');
    } else {
      setZipError('');
    }
  };

  const steps = [
    { id: 'shipping', label: 'Envío', icon: Truck },
    { id: 'payment', label: 'Pago', icon: CreditCard },
    { id: 'confirmation', label: 'Confirmación', icon: CheckCircle },
  ];

  const handleNext = () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('confirmation');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 md:p-8 border-b border-gray-100 flex items-center justify-between shrink-0 bg-titan-light/30">
        <button 
          onClick={onCancel} 
          className="p-2 -ml-2 text-titan-dark hover:text-titan-orange transition-colors"
          aria-label="Volver"
          title="Volver"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <div className="flex items-center gap-4 md:gap-8">
           {steps.map((s, i) => {
             const Icon = s.icon;
             const active = s.id === step;
             const finished = (step === 'payment' && s.id === 'shipping') || step === 'confirmation';
             return (
               <div key={s.id} className="flex items-center gap-2 md:gap-3">
                 <div className={cn(
                   "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500",
                   active ? "bg-titan-dark text-white scale-110 shadow-lg" : finished ? "bg-titan-orange text-white" : "bg-gray-100 text-gray-400"
                 )}>
                   {finished && s.id !== step ? <CheckCircle className="h-3 w-3 md:h-4 md:w-4" /> : <Icon className="h-3 w-3 md:h-4 md:w-4" />}
                 </div>
                 <span className={cn("text-[8px] md:text-[9px] font-black uppercase tracking-widest hidden sm:block", active ? "text-titan-dark" : "text-gray-400")}>{s.label}</span>
                 {i < steps.length - 1 && <div className="hidden sm:block w-4 md:w-8 h-px bg-gray-100 mx-1 md:mx-2" />}
               </div>
             );
           })}
        </div>
        <div className="w-8 md:w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          {step === 'shipping' && (
            <motion.div 
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto space-y-8"
            >
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-titan-dark italic">Dirección de <span className="text-titan-orange">Envío</span></h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Logística Titan Pro optimizada para el archipiélago</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="checkout-name" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre Completo</label>
                  <input 
                    id="checkout-name"
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-titan-light/50 border-none rounded-md p-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-titan-orange transition-all" 
                    placeholder="Tu nombre completo"
                    title="Nombre Completo"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="checkout-address" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Dirección 7 Islas</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-titan-orange" />
                    <input 
                      id="checkout-address"
                      type="text" 
                      value={formData.address} 
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-titan-light/50 border-none rounded-md p-4 pl-12 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-titan-orange transition-all" 
                      placeholder="Dirección completa"
                      title="Dirección de envío"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-city" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ciudad / Isla</label>
                  <input 
                    id="checkout-city"
                    type="text" 
                    value={formData.city} 
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-titan-light/50 border-none rounded-md p-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-titan-orange transition-all" 
                    placeholder="Ciudad o Isla"
                    title="Ciudad o Isla"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-zip" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Código Postal</label>
                  <input 
                    id="checkout-zip"
                    type="text" 
                    value={formData.zip} 
                    maxLength={5}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, zip: val });
                      validateZip(val);
                    }}
                    className={cn(
                      "w-full bg-titan-light/50 border-none rounded-md p-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 transition-all",
                      zipError ? "ring-2 ring-red-500 bg-red-50" : "focus:ring-titan-orange"
                    )} 
                    placeholder="CP"
                    title="Código Postal"
                  />
                  <AnimatePresence>
                    {zipError && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[8px] font-bold text-red-500 uppercase tracking-widest mt-1 italic"
                      >
                        {zipError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-6 bg-titan-orange/5 border border-titan-orange/20 rounded-md flex items-start gap-4">
                <Truck className="h-6 w-6 text-titan-orange shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-titan-dark">Envío Premium Interinsular</p>
                  <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase leading-relaxed">Entrega estimada en 24/48 horas. Incluye montaje y puesta en marcha por técnicos certificados Titan.</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto space-y-8"
            >
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-titan-dark italic">Método de <span className="text-titan-orange">Pago</span></h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Transacciones blindadas con tecnología Titan Vault</p>
              </div>

              <div className="space-y-4">
                <div className="p-6 border-2 border-titan-dark rounded-md flex items-center justify-between cursor-pointer shadow-xl">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6 text-titan-orange" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest">Tarjeta Titan Pro **** 4422</p>
                      <p className="text-[8px] font-bold text-gray-400 uppercase">Exp: 12/28</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-titan-orange" />
                </div>
                <div className="p-6 border border-gray-100 rounded-md flex items-center justify-between cursor-not-allowed opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Añadir Nuevo Método</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 border border-green-100 rounded-md flex items-start gap-4">
                <ShieldCheck className="h-6 w-6 text-green-500 shrink-0" />
                <p className="text-[9px] font-bold text-green-700 uppercase leading-relaxed">Tu pago está protegido por nuestra garantía de satisfacción total de 30 días.</p>
              </div>
            </motion.div>
          )}

          {step === 'confirmation' && (
            <motion.div 
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto py-12 text-center space-y-8"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-titan-orange/20 blur-3xl rounded-full" />
                <motion.div 
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="relative p-8 bg-titan-dark rounded-full shadow-2xl text-white"
                >
                  <CheckCircle className="h-16 w-16 text-titan-orange" />
                </motion.div>
              </div>
              
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter text-titan-dark italic">¡Orden <span className="text-titan-orange">Confirmada!</span></h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">Nuestros técnicos están preparando tu pedido titan #PRO-7729</p>
              </div>

              <div className="bg-titan-light/50 p-8 rounded-md border border-gray-100 text-left">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Pagado:</span>
                   <span className="text-xl font-black text-titan-orange">${total.toFixed(2)}</span>
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 leading-relaxed text-center">Recibirás un correo de seguimiento en breve. Gracias por elegir SasoriLabs e ingeniería Titan.</p>
              </div>

              <button 
                onClick={onCancel}
                className="w-full py-5 bg-titan-dark text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-md hover:bg-black transition-all shadow-xl"
              >
                Volver a la tienda
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      {step !== 'confirmation' && (
        <div className="p-8 border-t border-gray-100 bg-white shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-center md:text-left">
             <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Total del Pedido</p>
             <p className="text-2xl font-black text-titan-dark">${total.toFixed(2)}</p>
           </div>
           <button 
             onClick={handleNext}
             className="w-full md:w-auto px-12 py-5 bg-titan-dark text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-md hover:bg-black transition-all shadow-xl flex items-center justify-center gap-4"
           >
             {step === 'shipping' ? 'Continuar al Pago' : 'Finalizar Pedido'}
             <ChevronRight className="h-4 w-4" />
           </button>
        </div>
      )}
    </div>
  );
}
