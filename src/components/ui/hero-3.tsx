"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { Plus, Minus } from "lucide-react";
import { ProductRevealCard } from "./product-reveal-card";

interface HeroProduct {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  description: string;
  rating: number;
}

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  products: HeroProduct[];
  className?: string;
  onCtaClick?: () => void;
}

const ActionButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ 
      boxShadow: ["0px 0px 0px 0px rgba(249, 115, 22, 0)", "0px 0px 0px 10px rgba(249, 115, 22, 0.4)", "0px 0px 0px 0px rgba(249, 115, 22, 0)"] 
    }}
    transition={{ 
      duration: 2, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
    onClick={onClick}
    className="mt-8 px-8 py-3 rounded-full bg-titan-orange text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-lg transition-colors hover:bg-titan-orange-hover focus:outline-none focus:ring-2 focus:ring-titan-orange focus:ring-opacity-75"
  >
    {children}
  </motion.button>
);

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  products,
  className,
  onCtaClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityY = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full h-[80vh] overflow-hidden bg-white flex flex-col items-center justify-center text-center px-4 py-24",
        className
      )}
    >
      {/* Decorative Orange Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(242,130,36,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-[20%] left-0 w-full h-[60%] bg-titan-orange/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div style={{ y: parallaxY }} className="z-10 flex flex-col items-center mb-12">
        {tagline && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mb-8 inline-block rounded-full bg-titan-dark px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-2xl"
          >
            {tagline}
          </motion.div>
        )}

        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="text-6xl md:text-9xl font-black tracking-tighter text-titan-dark opacity-100 uppercase italic drop-shadow-[0_10px_30px_rgba(242,130,36,0.1)]"
        >
          {typeof title === 'string' ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.5 }}
            className="mt-10 max-w-2xl text-base font-black uppercase tracking-[0.15em] text-gray-500 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)] bg-gray-50/50 backdrop-blur-md p-6 rounded-xl border border-gray-100"
          >
            {description}
          </motion.p>
        )}

      </motion.div>

      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        className="absolute bottom-0 left-0 w-full h-1/2 md:h-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_85%,transparent)] pointer-events-none"
      >
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            ease: "linear",
            duration: 50,
            repeat: Infinity,
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 pointer-events-auto"
              style={{
                rotate: `${(index % 2 === 0 ? -2 : 2)}deg`,
              }}
            >
              <ProductRevealCard
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                description={product.description}
                rating={product.rating}
                className="w-64 md:w-80"
                onAdd={() => onCtaClick?.()}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
