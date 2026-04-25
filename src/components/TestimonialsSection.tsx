"use client";
import React from 'react';
import { motion } from "motion/react";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Los sistemas Titan han transformado mi cocina. La eficiencia energética en las islas es real, noto el ahorro cada mes.",
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
    text: "La durabilidad de los materiales Titan es incomparable. Ideales para el clima marino de nuestras islas.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    name: "Javier Santana",
    role: "Empresario",
  },
  {
    text: "Titan Pro no es solo una marca, es un estándar de vida. Mi hogar ahora es inteligente y mucho más cómodo.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    name: "Marta Betancor",
    role: "Consultora",
  },
  {
    text: "Increíble cómo han adaptado la tecnología alemana a las necesidades específicas de Canarias.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    name: "Roberto Suárez",
    role: "Chef de Repostería",
  },
  {
    text: "La mejor inversión que he hecho para mi casa. La calidad Titan se siente en cada interacción diaria.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    name: "Laura Méndez",
    role: "Diseñadora Gráfica",
  },
  {
    text: "Servicio post-venta excepcional. Es raro encontrar marcas que cuiden tanto al cliente en las islas.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "Antonio Pérez",
    role: "Gestor Comercial",
  },
  {
    text: "El diseño es tan limpio que encaja perfectamente en mi salón moderno. Titan es el futuro del hogar.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    name: "Patricia Luján",
    role: "Decoradora",
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-24 relative overflow-hidden border-t border-gray-100">
      <div className="container z-10 mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[700px] mx-auto text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="border border-titan-orange/20 bg-titan-orange/5 text-titan-orange text-[10px] font-black uppercase tracking-[0.3em] py-1 px-4 rounded-full">
              Comunidad Titan
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-titan-dark uppercase italic">
            Voces de la <span className="text-titan-orange">Excelencia</span>
          </h2>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-gray-400 leading-relaxed">
            Descubre por qué los hogares más exigentes de Canarias eligen la ingeniería y el diseño de Titan Pro.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
