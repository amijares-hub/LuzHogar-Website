import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
  className?: string;
  onButtonClick?: () => void;
}

const defaultItems = [
  "Envío Exclusivo a Canarias",
  "Soporte Técnico Especializado",
  "Garantía de Satisfacción Total",
  "Financiación Flexible a Medida",
  "Marcas Líderes Mundiales",
];

export const Cta4 = ({
  title = "Transforma tu Hogar con Luz Hogar",
  description = "Expertos en equipamiento premium para tu casa en las Islas Canarias. Calidad industrial, soporte local y durabilidad garantizada en cada producto.",
  buttonText = "Explorar Catálogo",
  items = defaultItems,
  className,
  onButtonClick,
}: Cta4Props) => {
  return (
    <section className={cn("py-24 bg-white", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="flex flex-col items-start justify-between gap-12 rounded-3xl bg-titan-light/50 border border-titan-orange/5 px-8 py-12 md:flex-row lg:px-20 lg:py-20 shadow-2xl shadow-titan-orange/5">
              <div className="md:w-3/5">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-titan-orange mb-4 block">Confianza Canaria</span>
                <h2 className="mb-6 text-4xl lg:text-6xl font-black tracking-tighter text-titan-dark uppercase italic leading-none">
                  {title}
                </h2>
                <p className="text-gray-500 text-sm uppercase tracking-widest leading-loose mb-10 max-w-lg">
                  {description}
                </p>
                <Button 
                  onClick={onButtonClick}
                  className="bg-titan-orange text-white px-10 py-7 rounded-md text-[11px] font-black uppercase tracking-[0.3em] hover:bg-titan-orange-hover transition-all shadow-xl shadow-titan-orange/20"
                >
                  {buttonText} <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <div className="md:w-1/3 flex flex-col justify-center">
                <ul className="flex flex-col space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-titan-dark italic mb-8">
                  {items.map((item, idx) => (
                    <li className="flex items-center group" key={idx}>
                      <div className="mr-6 size-5 rounded-full bg-titan-orange flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Check className="size-2.5 stroke-[4]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Mini Product Marquee */}
                <div className="relative w-full overflow-hidden h-24 rounded-xl bg-white/40 border border-white/60 p-2">
                  <motion.div 
                    className="flex gap-3 h-full"
                    animate={{
                      x: [0, -100 * 4], // Adjust based on item width + gap
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {[
                      "/lavadora-10kg-1400rpm-candy.jpg",
                      "/cocina-de-gas-1-fuego-serie-vulcano-muvip.jpg",
                      "/lavavajillas-corbero-12-servicios-color-inox.jpg",
                      "/microondas-20l-con-grill-teka.jpg",
                      "/vinoteca-10-botellas-65w-56cm-muvip.jpg",
                      "/campana-teka-decorativa-60cms.jpg",
                      "/radio-portatil-am-fm-dial-clasico-negra-gen-x.jpg",
                      "/placa-vitroceramica-4-focos-teka.jpg",
                      // Duplicate for seamless loop
                      "/lavadora-10kg-1400rpm-candy.jpg",
                      "/cocina-de-gas-1-fuego-serie-vulcano-muvip.jpg",
                      "/lavavajillas-corbero-12-servicios-color-inox.jpg",
                      "/microondas-20l-con-grill-teka.jpg",
                    ].map((src, i) => (
                      <div key={i} className="flex-shrink-0 h-full aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100">
                        <img src={src} alt="Product" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
