import React from 'react';
import { GradientCard } from './ui/gradient-card';
import { motion } from 'framer-motion';

interface CategoryGradientSectionProps {
  onNavigate: (page: any) => void;
}

const categories = [
  {
    badgeText: "TOP VENTAS",
    badgeColor: "#F28224", 
    title: "Gran Electro",
    description: "Equipa tu cocina con tecnología de vanguardia. Lavadoras y neveras con eficiencia A+++.",
    ctaText: "¡Lo más vendido!",
    imageUrl: "/lavadora-11kg-samsung.jpg",
    gradient: "orange" as const,
  },
  {
    badgeText: "NOVEDADES",
    badgeColor: "#F28224", 
    title: "Imagen y Sonido",
    description: "Cine en casa con la mejor resolución. Televisores y barras de sonido de última generación.",
    ctaText: "Ver novedades",
    imageUrl: "/radio-portatil-am-fm-dial-clasico-negra-gen-x.jpg",
    gradient: "orange" as const,
  },
  {
    badgeText: "OFERTA FLASH",
    badgeColor: "#F28224", 
    title: "Pequeño Electro",
    description: "Simplifica tu día a día. Cafeteras y microondas premium con descuentos exclusivos.",
    ctaText: "Aprovechar oferta",
    imageUrl: "/microondas-20l-con-grill-teka.jpg",
    gradient: "orange" as const,
  },
  {
    badgeText: "EDICIÓN LIMITADA",
    badgeColor: "#F28224", 
    title: "Climatización",
    description: "El clima perfecto en tu hogar. Aire acondicionado y ventilación de alta gama.",
    ctaText: "Ver selección",
    imageUrl: "/vinoteca-10-botellas-65w-56cm-muvip.jpg",
    gradient: "orange" as const,
  },
];


export default function CategoryGradientSection({ onNavigate }: CategoryGradientSectionProps) {
  return (
    <section className="py-32 bg-[#000000] relative overflow-hidden">
      {/* Background Cinematic Effects - Pure Orange & White Only */}
      <div className="absolute top-0 left-1/4 w-3/4 h-3/4 bg-titan-orange/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-3/4 h-3/4 bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">


        <div className="mb-20 text-center lg:text-left">
          <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
            <div className="h-[1px] w-12 bg-titan-orange" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-titan-orange">Explora por Categoría</h2>
          </div>
          <p className="text-5xl lg:text-8xl font-black tracking-tighter text-titan-orange uppercase italic leading-none">
            SECCIONES ESTRATÉGICAS
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onNavigate('catalog')}
              className="cursor-pointer"
            >
              <GradientCard
                badgeText={cat.badgeText}
                badgeColor={cat.badgeColor}
                title={cat.title}
                description={cat.description}
                ctaText={cat.ctaText}
                imageUrl={cat.imageUrl}
                gradient={cat.gradient}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
