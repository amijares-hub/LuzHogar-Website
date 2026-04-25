"use client";
import React from "react";
import { motion } from "motion/react";

const testimonials_data = [
  {
    text: "Los sistemas de Luz Hogar han transformado mi cocina. La eficiencia energética en las islas es real, noto el ahorro cada mes.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Elena García",
    role: "Chef Profesional - Tenerife",
  },
  {
    text: "Ingeniería de primer nivel. El servicio técnico en Gran Canaria fue impecable instalando mi sistema de purificación.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "Carlos Medina",
    role: "Arquitecto",
  },
  {
    text: "Minimalismo y potencia. Nunca pensé que una lavadora pudiera ser una pieza de diseño tan elegante.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    name: "Sofía Ramos",
    role: "Diseñadora de Interiores",
  },
  {
    text: "La durabilidad de los materiales de Luz Hogar es incomparable. Ideales para el clima marino de nuestras islas.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    name: "Javier Santana",
    role: "Empresario",
  },
  {
    text: "Luz Hogar no es solo una marca, es un estándar de vida. Mi hogar ahora es inteligente y mucho más cómodo.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    name: "Marta Betancor",
    role: "Consultora",
  },
  {
    text: "Increíble cómo han adaptado la tecnología alemana a las necesidades específicas de Canarias.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    name: "Roberto Suárez",
    role: "Chef de Repostería",
  }
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials_data;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-10 rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/20 max-w-xs w-full" 
                  key={`${index}-${i}`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 leading-relaxed italic">"{text}"</div>
                  <div className="flex items-center gap-4 mt-8">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full grayscale object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <div className="text-[10px] font-black uppercase tracking-tighter text-titan-dark">{name}</div>
                      <div className="text-[8px] font-bold uppercase tracking-widest text-titan-orange">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
