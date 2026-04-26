"use client";

import React, { ReactNode, useState } from "react";
import { cn } from "@/src/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const images = [
  "/lavadora-10kg-1400rpm-candy.jpg",
  "/vinoteca-10-botellas-65w-56cm-muvip.jpg",
  "/radio-portatil-am-fm-dial-clasico-negra-gen-x.jpg",
  "/microondas-teka-integrable-25-l.jpg",
];

const images2 = [
  "/cocina-gas-inox-1-fuego-serie-strong-muvip.jpg",
  "/lavadora-11kg-samsung.jpg",
  "/placa-vitroceramica-4-focos-teka.jpg",
  "/lavavajillas-corbero-12-servicios-color-inox.jpg",
];

function ScrambleButton({ onClick }: { onClick?: () => void }) {
  const [displayText, setDisplayText] = useState("Explorar Catálogo");
  const [isScrambling, setIsScrambling] = useState(false);
  const originalText = "Explorar Catálogo";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const maxIterations = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            if (letter === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <button
      onMouseEnter={scramble}
      onClick={onClick}
      className="px-8 py-4 bg-titan-orange text-white rounded-full font-black uppercase tracking-widest hover:bg-titan-orange-hover transition-colors shadow-xl"
    >
      {displayText}
    </button>
  );
}

export function HeroWithMarquee({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="py-24 bg-white text-titan-dark flex items-center overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left z-10 relative">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-titan-orange">Tecnología y Diseño</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase tracking-tighter">
              El Futuro del <span className="text-titan-orange">Equipamiento</span> de tu Hogar
            </h2>
            <div className="space-y-2 text-gray-500 font-bold uppercase tracking-widest text-xs">
              <p>Calidad Premium</p>
              <p>Luz Hogar Canarias</p>
            </div>
            <div className="pt-4 flex justify-center lg:justify-start">
              <ScrambleButton onClick={() => onNavigate('catalog')} />
            </div>
          </div>

          {/* Right Marquee Grid */}
          <div className="space-y-4 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
            
            <Marquee speed={30} reverse className="[--gap:1rem]">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm bg-neutral-50"
                >
                  <img
                    src={src}
                    alt={`Producto ${idx + 1}`}
                    className="object-cover w-full h-full mix-blend-multiply hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </Marquee>
            <Marquee speed={30} className="[--gap:1rem]">
              {images2.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm bg-neutral-50"
                >
                  <img
                    src={src}
                    alt={`Producto ${idx + 5}`}
                    className="object-cover w-full h-full mix-blend-multiply hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
