import React from 'react';
import { AnimatedMarqueeHero } from './ui/hero-3';

const HERO_PRODUCTS = [
  {
    name: "Lavadora Candy 10KG",
    price: "349€",
    originalPrice: "429€",
    image: "/lavadora-10kg-1400rpm-candy.jpg",
    description: "Gran capacidad y 1400 RPM para un secado eficiente. Tecnología Smart Pro.",
    rating: 4.8
  },
  {
    name: "Cocina Vulcano Muvip",
    price: "89€",
    originalPrice: "119€",
    image: "/cocina-de-gas-1-fuego-serie-vulcano-muvip.jpg",
    description: "Potencia y precisión para tus mejores platos. Acero inoxidable de alta resistencia.",
    rating: 4.9
  },
  {
    name: "Lavavajillas Corberó",
    price: "299€",
    originalPrice: "359€",
    image: "/lavavajillas-corbero-12-servicios-color-inox.jpg",
    description: "12 servicios, bajo consumo y diseño elegante en color inox para tu cocina.",
    rating: 4.7
  },
  {
    name: "Microondas Teka Grill",
    price: "159€",
    originalPrice: "199€",
    image: "/microondas-20l-con-grill-teka.jpg",
    description: "Integrable, 20 litros con grill de alta potencia. Acabado premium anti-huellas.",
    rating: 4.9
  },
  {
    name: "Vinoteca Muvip 10B",
    price: "129€",
    originalPrice: "169€",
    image: "/vinoteca-10-botellas-65w-56cm-muvip.jpg",
    description: "Mantén tus vinos a la temperatura perfecta. Capacidad para 10 botellas.",
    rating: 4.8
  },
  {
    name: "Placa Vitro Teka",
    price: "199€",
    originalPrice: "249€",
    image: "/placa-vitroceramica-4-focos-teka.jpg",
    description: "4 focos de cocción rápida con controles táctiles de precisión.",
    rating: 5.0
  },
];

export default function AnimatedHeroSection({ onNavigate }: { onNavigate: (page: any) => void }) {
  return (
    <div className="w-full">
      <AnimatedMarqueeHero 
        title={
          <>
            Eleva tu Hogar
            <br />
            Con Luz Hogar
          </>
        }
        ctaText="Explorar Catálogo"
        products={HERO_PRODUCTS}
        onCtaClick={() => onNavigate('catalog')}
      />
    </div>
  );
}
