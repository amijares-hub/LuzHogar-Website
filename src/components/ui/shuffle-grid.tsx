"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";

export const ShuffleHero = ({ onNavigate }: { onNavigate?: (page: any) => void }) => {
  return (
    <section className="w-full px-8 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl mx-auto">
      <div>
        <span className="block mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-titan-orange">
          Equipamiento de AQUÍ
        </span>
        <h3 className="text-5xl md:text-7xl font-black text-titan-dark uppercase tracking-tighter leading-[0.9] mb-8">
          DISEÑADO PARA <br />
          <span className="text-titan-orange italic font-serif font-light tracking-tight">nuestras islas.</span>
        </h3>
        <p className="text-sm md:text-lg text-gray-500 uppercase tracking-widest leading-loose mb-10 max-w-lg">
          Herramientas y sistemas de iluminación de grado profesional. 
          Venta exclusiva en Canarias — Porque somos de AQUÍ.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => onNavigate?.('catalog')}
            className={cn(
              "bg-titan-orange text-white font-black py-5 px-10 rounded-md text-[11px] uppercase tracking-[0.3em]",
              "transition-all hover:bg-titan-orange-hover active:scale-95 shadow-lg"
            )}
          >
            Ver Catálogo
          </button>
          <button 
            onClick={() => onNavigate?.('catalog')}
            className={cn(
              "bg-white text-titan-dark border border-gray-200 font-black py-5 px-10 rounded-md text-[11px] uppercase tracking-[0.3em]",
              "transition-all hover:bg-titan-light active:scale-95 shadow-sm"
            )}
          >
            Ofertas del mes
          </button>
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1571175432248-18e3a27072a4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1588854337221-4cc9fa96059c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1521203381488-8422513-1b9da1ea8f6e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1540639225983-0703b7a1ef91?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1520981106093-68f7f2cb1456?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1521903062400-b80a2bb0cd2d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1551024709-3f2301d13d70?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1662991660706-928ecf73441a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
  },
];

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden bg-titan-light"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};
