import React, { useState } from 'react';
import { ExternalLink, Globe, Shield, Instagram, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export interface BrandMember {
  id: string;
  name: string;
  role: string;
  image: string;
  url?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const DEFAULT_BRANDS: BrandMember[] = [
  {
    id: '1',
    name: 'SIEMENS',
    role: 'INGENIERÍA ALEMANA',
    image: '/Siemens-Logo.png',
    url: 'https://siemens-home.bsh-group.com/',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: '2',
    name: 'BOSCH',
    role: 'TECNOLOGÍA PARA LA VIDA',
    image: '/Bosch-Logo-700x394.png',
    url: 'https://www.bosch-home.es/',
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    id: '3',
    name: 'LIEBHERR',
    role: 'FRÍO DE ALTA PRECISIÓN',
    image: '/Liebherr-Logo-700x394.png',
    url: 'https://home.liebherr.com/',
    socials: { twitter: '#' }
  },
  {
    id: '4',
    name: 'SMEG',
    role: 'DISEÑO ICÓNICO ITALIANO',
    image: '/Smeg-Logo-500x281.png',
    url: 'https://www.smeg.es/',
    socials: { instagram: '#', twitter: '#' }
  },
  {
    id: '5',
    name: 'MIELE',
    role: 'CALIDAD SIN COMPROMISOS',
    image: '/Miele-Logo-500x281.png',
    url: 'https://www.miele.es/',
    socials: { linkedin: '#' }
  },
  {
    id: '6',
    name: 'LUZ HOGAR PRO',
    role: 'NUESTRA PROPIA LÍNEA',
    image: '/luzhogar logo.jpg',
    url: '#',
    socials: { instagram: '#', linkedin: '#', twitter: '#' }
  },
];

interface BrandShowcaseProps {
  brands?: BrandMember[];
}

export default function BrandShowcase({ brands = DEFAULT_BRANDS }: BrandShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = brands.filter((_, i) => i % 3 === 0);
  const col2 = brands.filter((_, i) => i % 3 === 1);
  const col3 = brands.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-8">
      {/* ── Left: photo grid ── */}
      <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((brand) => (
            <PhotoCard
              key={brand.id}
              brand={brand}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
          {col2.map((brand) => (
            <PhotoCard
              key={brand.id}
              brand={brand}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
          {col3.map((brand) => (
            <PhotoCard
              key={brand.id}
              brand={brand}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: brand name list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
        {brands.map((brand) => (
          <BrandRow
            key={brand.id}
            brand={brand}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

interface PhotoCardProps {
  key?: React.Key;
  brand: BrandMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

function PhotoCard({
  brand,
  className,
  hoveredId,
  onHover,
}: PhotoCardProps) {
  const isActive = hoveredId === brand.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-all duration-500 group relative',
        className,
        isDimmed ? 'opacity-30' : 'opacity-100 uppercase',
        isActive ? 'shadow-[0_30px_60px_rgba(242,130,36,0.4)] z-10' : 'shadow-xl'
      )}
      onMouseEnter={() => onHover(brand.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.img
        src={brand.image}
        alt={brand.name}
        className="w-full h-full object-contain p-4 transition-all duration-700"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(1)',
        }}
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
        referrerPolicy="no-referrer"
      />
      {/* Shine effect */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: 0.3 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      <div className={cn(
        "absolute inset-0 bg-titan-orange/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
        isActive ? "opacity-100" : ""
      )}>
        <Shield size={isActive ? 32 : 24} className={cn("text-white transition-all duration-500", isActive ? "scale-110 drop-shadow-lg" : "")} />
      </div>
    </motion.div>
  );
}

interface BrandRowProps {
  key?: React.Key;
  brand: BrandMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

function BrandRow({
  brand,
  hoveredId,
  onHover,
}: BrandRowProps) {
  const isActive = hoveredId === brand.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300 py-1',
        isDimmed ? 'opacity-20' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(brand.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + Icon */}
      <div className="flex items-center gap-4">
        <motion.span
          animate={{
             width: isActive ? 40 : 16,
             backgroundColor: isActive ? '#F28224' : '#E5E7EB'
          }}
          className="h-1 rounded-full flex-shrink-0"
        />
        <span
          className={cn(
            'text-xl md:text-[28px] font-black leading-none uppercase italic transition-all duration-300',
            isActive ? 'text-titan-dark tracking-wider scale-105' : 'text-gray-300 tracking-tighter',
          )}
        >
          {brand.name}
        </span>

        {/* Social & Action icons */}
        <div
          className={cn(
            'flex items-center gap-3 ml-auto transition-all duration-500',
            isActive
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-8 pointer-events-none',
          )}
        >
          {brand.socials?.instagram && <Instagram size={14} className="text-gray-400 hover:text-titan-orange transition-colors" />}
          {brand.socials?.twitter && <Twitter size={14} className="text-gray-400 hover:text-titan-orange transition-colors" />}
          {brand.socials?.linkedin && <Linkedin size={14} className="text-gray-400 hover:text-titan-orange transition-colors" />}
          
          <div className="w-px h-4 bg-gray-200 mx-1" />
          
          <a 
            href={brand.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full bg-titan-light text-titan-dark hover:bg-titan-orange hover:text-white transition-all shadow-sm"
            aria-label={`Visitar sitio web de ${brand.name}`}
            title="Visitar Sitio Web"
          >
            <Globe size={14} />
          </a>
        </div>
      </div>

      {/* Role / Description */}
      <motion.p 
        animate={{
          x: isActive ? 48 : 32,
          color: isActive ? '#F28224' : '#9CA3AF'
        }}
        className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] italic"
      >
        {brand.role}
      </motion.p>
    </div>
  );
}
