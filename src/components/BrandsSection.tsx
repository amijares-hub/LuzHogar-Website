import React from 'react';
import BrandShowcase from './ui/team-showcase';
import { motion } from 'framer-motion';

export default function BrandsSection() {
  return (
    <section className="py-32 relative overflow-hidden border-t border-gray-100">
      {/* Background with real image */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full h-full relative">
          <img 
            src="/luzhogar.png" 
            alt="Luz Hogar Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-32 h-[1px] bg-titan-orange/30 -translate-y-8" />
              <div className="w-12 h-1 bg-titan-orange mb-8" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-titan-orange mb-6">Partners Estratégicos</h2>
              <p className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-titan-dark uppercase italic leading-[0.85] md:leading-none">
                MARCAS QUE <br />
                <span className="text-gray-200">DISTRIBUIMOS</span>
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:max-w-md text-right"
          >
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
              Seleccionamos solo lo mejor de la ingeniería global. Colaboramos directamente con los fabricantes líderes para garantizar stock real y soporte local en cada una de nuestras sedes.
            </p>
          </motion.div>
        </div>

        <BrandShowcase />
        
        <div className="mt-20 pt-10 border-t border-gray-50 flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
          {/* Subtle text logos for a tech feel */}
          {["SIEMENS", "BOSCH", "LIEBHERR", "SMEG", "MIELE", "NEFF", "TEKA", "CANDY", "LG", "SAMSUNG"].map(name => (
            <span key={name} className="text-xl font-black tracking-tighter italic">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
