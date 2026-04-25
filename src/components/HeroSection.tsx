import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, ShoppingCart } from 'lucide-react';
import { MinimalistHero } from './ui/minimalist-hero';

export default function HeroSection({ onNavigate }: { onNavigate?: (page: any) => void }) {
  const navLinks = [
    { label: 'OFERTAS', href: '#' },
    { label: 'NOSOTROS', href: '#' },
    { label: 'SOPORTE', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  const carouselItems = [
    { image: "/lavavajillas-corbero-12-servicios-color-inox.jpg", text: "LAVAVAJILLAS PREMIUM INOX" },
    { image: "/lavadora-11kg-samsung.jpg", text: "DISEÑO LAVADO SAMSUNG" },
    { image: "/placa-vitroceramica-4-focos-teka.jpg", text: "COCCIÓN TEKA DE PRECISIÓN" },
    { image: "/microondas-20l-inox-700w-grunkel.jpg", text: "MICROONDAS GRUNKEL MODERNO" },
  ];

  const handleReadMoreClick = () => {
    const featuredSection = document.getElementById('new-arrivals');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MinimalistHero
      logoText="LUZ HOGAR"
      navLinks={navLinks}
      mainText="TECNOLOGÍA DE VANGUARDIA PARA TU HOGAR. DISEÑO, EFICIENCIA Y DURABILIDAD EN CADA DETALLE."
      readMoreLink="#"
      onReadMoreClick={handleReadMoreClick}
      carouselItems={carouselItems}
      imageAlt="Productos Premium Luz Hogar"
      overlayText={{
        part1: 'luz en',
        part2: 'tu hogar.',
      }}
      socialLinks={socialLinks}
      locationText="LUZ HOGAR - CANARIAS, ESPAÑA"
    />
  );
}

