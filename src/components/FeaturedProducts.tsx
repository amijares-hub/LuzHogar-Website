import React from 'react';
import { FocusRail, type FocusRailItem } from './ui/focus-rail';

const FEATURED_APPLIANCES: FocusRailItem[] = [
  {
    id: "f1",
    title: "Eco-Smart Lavado",
    description: "¡Ahorra un 40% de energía! Lavadoras inteligentes con motor Inverter ultra-silencioso.",
    meta: "OFERTA EXCLUSIVA",
    imageSrc: "/lavadora-candy-8-kg-1400-rpm.jpg",
    href: "catalog",
  },
  {
    id: "f2",
    title: "Frío No-Frost Pro",
    description: "Conservación extrema para el clima canario. Tecnología de vanguardia en acero inoxidable.",
    meta: "TOP VENTAS",
    imageSrc: "/vinoteca-10-botellas-65w-56cm-muvip.jpg",
    href: "catalog",
  },
  {
    id: "f3",
    title: "Sonido Retro Pro",
    description: "El regalo perfecto. Alta fidelidad con diseño icónico. ¡Unidades limitadas!",
    meta: "EDICIÓN ESPECIAL",
    imageSrc: "/radio-portatil-am-fm-dial-clasico-negra-gen-x.jpg",
    href: "catalog",
  },
  {
    id: "f4",
    title: "AirFryer Digital",
    description: "Cocina sano sin renunciar al sabor. La freidora de aire más deseada de Canarias.",
    meta: "RECOMENDADO",
    imageSrc: "/microondas-teka-integrable-25-l.jpg",
    href: "catalog",
  },
  {
    id: "f5",
    title: "Confort Térmico",
    description: "Máxima potencia de cocción. Rendimiento industrial ahora en tu cocina.",
    meta: "NOVEDAD",
    imageSrc: "/cocina-gas-inox-1-fuego-serie-strong-muvip.jpg",
    href: "catalog",
  }
];


export default function FeaturedProducts({ onNavigate }: { onNavigate: (page: any) => void }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16 text-center lg:text-left">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md border border-gray-100 shrink-0">
              <img src="/luzhogar%20logo.jpg" alt="Luz Hogar Logo" className="w-[85%] h-[85%] object-contain" />
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-titan-orange">Selección Premium</span>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-titan-dark uppercase mt-4 mb-6">Productos <span className="text-titan-orange">Destacados</span></h2>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold max-w-xl">
            Navega por nuestra selección de élite en electrodomésticos diseñados para durar. 
            Calidad industrial para tu hogar en Canarias.
          </p>
        </div>

        <FocusRail 
          items={FEATURED_APPLIANCES} 
          autoPlay={true} 
          loop={true} 
          onNavigate={(href) => onNavigate(href)}
        />
      </div>
    </section>
  );
}
