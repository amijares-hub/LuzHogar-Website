import React from 'react';
import InteractiveImageBentoGallery, { ImageItem } from './ui/bento-gallery';

const applianceItems: ImageItem[] = [
  {
    id: 1,
    title: "Lavado Pro Inverter",
    desc: "Máxima capacidad y eficiencia A+++.",
    url: "/lavadora-8kg-1400rpm-lg.jpg",
    secondaryImages: [
      "/lavadora-10kg-1400rpm-candy.jpg",
      "/lavadora-candy-8-kg-1400-rpm.jpg"
    ],
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Cocción Inducción",
    desc: "Control total de la temperatura.",
    url: "/cocina-de-induccion-1-fuego-2000w-muvip.jpg",
    secondaryImages: [
      "/placa-vitroceramica-4-focos-teka.jpg"
    ],
    span: "md:row-span-1",
  },
  {
    id: 3,
    title: "Cerveza y Vino",
    desc: "Tu colección a la temperatura ideal.",
    url: "/vinoteca-10-botellas-65w-56cm-muvip.jpg",
    span: "md:row-span-1",
  },
  {
    id: 4,
    title: "Campana de Techo",
    desc: "Potencia de extracción industrial.",
    url: "/campana-teka-decorativa-60cms.jpg",
    span: "md:row-span-2",
  },
  {
    id: 5,
    title: "Lavavajillas Silent",
    desc: "Olvídate de lavar los platos.",
    url: "/lavavajillas-corbero-12-servicios-color-inox.jpg",
    span: "md:row-span-1",
  },
  {
    id: 6,
    title: "Gourmet Microwave",
    desc: "Tecnología de calor envolvente.",
    url: "/microondas-20-litros-700w-con-grill-y-funcion-descongelacion-muvip.jpg",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 7,
    title: "Mesa Gaming Pro",
    desc: "Configuración extrema con RGB.",
    url: "/mesa-gaming-pro1500-xl-fibra-carbono-luz-rgb-sound-muvip.jpg",
    span: "md:row-span-1",
  },
  {
    id: 8,
    title: "Micrófono Mars",
    desc: "Audio cristalino para streaming.",
    url: "/microfono-gaming-usb-mmicx-blanco-mars-gaming.jpg",
    span: "md:row-span-1",
  },
]

export default function ApplianceShowcaseGrid({ onAddToCart }: { onAddToCart?: (item: any) => void }) {
  return (
    <div className="w-full antialiased bg-white border-t border-gray-100">
      <InteractiveImageBentoGallery
        imageItems={applianceItems}
        onAddToCart={onAddToCart}
        title="Galería de Innovación"
        description="Nuestros sistemas de vanguardia para el hogar canario. Arrastra para explorar."
        animationSpeed="fast"
        gap={6}
        overlayOpacity={0.7}
      />
    </div>
  )
}
