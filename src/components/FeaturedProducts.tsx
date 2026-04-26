import React from 'react';
import { FocusRail, type FocusRailItem } from './ui/focus-rail';
import Autoplay from "embla-carousel-autoplay";
import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryImage,
  StoryOverlay,
  StoryTitle,
} from './ui/stories-carousel';

type FeaturedItem = FocusRailItem & { brand?: string; brandAvatar?: string };

const FEATURED_APPLIANCES: FeaturedItem[] = [
  {
    id: "f1",
    title: "Lavadora Inverter",
    description: "¡Ahorra un 40% de energía! Lavadoras inteligentes con motor Inverter ultra-silencioso.",
    meta: "OFERTA EXCLUSIVA",
    imageSrc: "/lavadora-candy-8-kg-1400-rpm.jpg",
    href: "catalog",
    brand: "Candy",
    brandAvatar: "/Siemens-Logo.png",
  },
  {
    id: "f2",
    title: "Frío No-Frost",
    description: "Conservación extrema para el clima canario. Tecnología de vanguardia en acero inoxidable.",
    meta: "TOP VENTAS",
    imageSrc: "/vinoteca-10-botellas-65w-56cm-muvip.jpg",
    href: "catalog",
    brand: "Muvip",
    brandAvatar: "/Miele-Logo-500x281.png",
  },
  {
    id: "f3",
    title: "Sonido Retro",
    description: "El regalo perfecto. Alta fidelidad con diseño icónico. ¡Unidades limitadas!",
    meta: "EDICIÓN ESPECIAL",
    imageSrc: "/radio-portatil-am-fm-dial-clasico-negra-gen-x.jpg",
    href: "catalog",
    brand: "Gen X",
    brandAvatar: "/Smeg-Logo-500x281.png",
  },
  {
    id: "f4",
    title: "Microondas Inox",
    description: "Calentamiento ultra rápido y descongelación inteligente.",
    meta: "RECOMENDADO",
    imageSrc: "/microondas-teka-integrable-25-l.jpg",
    href: "catalog",
    brand: "Teka",
    brandAvatar: "/Bosch-Logo-700x394.png",
  },
  {
    id: "f5",
    title: "Cocina a Gas",
    description: "Máxima potencia de cocción. Rendimiento industrial ahora en tu cocina.",
    meta: "NOVEDAD",
    imageSrc: "/cocina-gas-inox-1-fuego-serie-strong-muvip.jpg",
    href: "catalog",
    brand: "Muvip",
    brandAvatar: "/Siemens-Logo.png",
  },
  {
    id: "f6",
    title: "Lavadora 10kg",
    description: "Gran capacidad para toda la familia. 1400 RPM.",
    meta: "PREMIUM",
    imageSrc: "/lavadora-10kg-1400rpm-candy.jpg",
    href: "catalog",
    brand: "Candy",
    brandAvatar: "/Liebherr-Logo-700x394.png",
  },
  {
    id: "f7",
    title: "Lavadora Eco",
    description: "Ahorra agua y energía con tecnología Eco-Bubble.",
    meta: "TOP ECO",
    imageSrc: "/lavadora-11kg-samsung.jpg",
    href: "catalog",
    brand: "Samsung",
    brandAvatar: "/Bosch-Logo-700x394.png",
  },
  {
    id: "f8",
    title: "Placa Vitro",
    description: "Cristal cerámico resistente con 4 zonas independientes.",
    meta: "COCINA",
    imageSrc: "/placa-vitroceramica-4-focos-teka.jpg",
    href: "catalog",
    brand: "Teka",
    brandAvatar: "/Miele-Logo-500x281.png",
  },
  {
    id: "f9",
    title: "Lavavajillas 12 Serv.",
    description: "Limpia tus platos con el mínimo consumo garantizado.",
    meta: "LIMPIEZA",
    imageSrc: "/lavavajillas-corbero-12-servicios-color-inox.jpg",
    href: "catalog",
    brand: "Corbero",
    brandAvatar: "/Siemens-Logo.png",
  },
  {
    id: "f10",
    title: "Campana Decorativa",
    description: "Extracción potente y silenciosa para eliminar olores.",
    meta: "DISEÑO",
    imageSrc: "/campana-teka-decorativa-60cms.jpg",
    href: "catalog",
    brand: "Teka",
    brandAvatar: "/Liebherr-Logo-700x394.png",
  },
  {
    id: "f11",
    title: "Cocina Inducción",
    description: "Control preciso y seguridad garantizada en cada receta.",
    meta: "INNOVACIÓN",
    imageSrc: "/cocina-de-induccion-1-fuego-2000w-muvip.jpg",
    href: "catalog",
    brand: "Muvip",
    brandAvatar: "/Smeg-Logo-500x281.png",
  },
  {
    id: "f12",
    title: "Microondas Grill",
    description: "Función grill incorporada para unos acabados crujientes.",
    meta: "COMPACTO",
    imageSrc: "/microondas-20-litros-700w-con-grill-y-funcion-descongelacion-muvip.jpg",
    href: "catalog",
    brand: "Muvip",
    brandAvatar: "/Bosch-Logo-700x394.png",
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

        <div className="hidden md:block">
          <FocusRail 
            items={FEATURED_APPLIANCES} 
            autoPlay={true} 
            loop={true} 
            onNavigate={(href) => onNavigate(href)}
          />
        </div>

        <div className="block md:hidden pb-12 overflow-visible">
          <Stories opts={{ loop: true }} plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}>
            <StoriesContent className="-ml-4 pl-4 pr-12">
              {FEATURED_APPLIANCES.map((product) => (
                <Story className="aspect-[3/4] w-[260px] pl-4 basis-auto" key={product.id} onClick={() => product.href && onNavigate(product.href)}>
                  <StoryImage alt={product.title} src={product.imageSrc} className="grayscale hover:grayscale-0 transition-all object-cover" />
                  <StoryOverlay side="top" className="h-24 from-black/60" />
                  <StoryOverlay side="bottom" className="h-32 from-black/80" />
                  <StoryTitle className="truncate font-black text-xl uppercase tracking-tighter text-white">
                    {product.title}
                  </StoryTitle>
                  <StoryAuthor>
                    <StoryAuthorImage
                      fallback={product.brand?.charAt(0)}
                      name={product.brand}
                      src={product.brandAvatar}
                      className="border-titan-orange border-2"
                    />
                    <StoryAuthorName className="uppercase tracking-widest text-[10px] font-black">{product.brand}</StoryAuthorName>
                  </StoryAuthor>
                </Story>
              ))}
            </StoriesContent>
          </Stories>
        </div>
      </div>
    </section>
  );
}
