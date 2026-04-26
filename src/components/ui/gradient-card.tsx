"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const cardVariants = cva(
  "relative flex flex-col justify-between h-[320px] w-full overflow-hidden rounded-[2.5rem] p-10 transition-all duration-500",
  {
    variants: {
      gradient: {
        orange: "bg-[#050505] border border-orange-500/20 shadow-[0_0_50px_-12px_rgba(249,115,22,0.2)]",
        gray: "bg-[#050505] border border-slate-500/20 shadow-[0_0_50px_-12px_rgba(100,116,139,0.2)]",
        purple: "bg-[#050505] border border-purple-500/20 shadow-[0_0_50px_-12px_rgba(139,92,246,0.2)]",
        green: "bg-[#050505] border border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  }
);

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  className?: string;
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  imageUrl: string;
}

export const GradientCard = ({ className, gradient, badgeText, badgeColor, title, description, ctaText, imageUrl, ...props }: GradientCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative h-full w-full perspective-[1000px]"
    >
      <div className={cn(cardVariants({ gradient }), className, "relative")} {...props}>
        {/* Animated Glow Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${glowX} ${glowY}, ${badgeColor}20, transparent 40%)`,
          }}
        />

        {/* Floating Background Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[8rem] font-black text-white/[0.02] uppercase italic select-none pointer-events-none whitespace-nowrap tracking-tighter">
          {title}
        </div>

        {/* Product Image with Parallax */}
        <motion.div
          style={{
            transform: "translateZ(50px)",
          }}
          className="absolute -right-12 -bottom-12 w-3/4 aspect-square"
        >
          <motion.img
            src={imageUrl}
            alt={title}
            initial={{ scale: 0.8, opacity: 0.4, rotate: -5 }}
            whileHover={{ scale: 1.1, opacity: 1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter brightness-110 saturate-125"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full [transform:translateZ(30px)]">
          {/* Badge */}
          <div 
            className="mb-4 md:mb-6 inline-flex items-center rounded-full px-3 md:px-4 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white border border-white/20 w-fit shadow-lg shadow-black/50 bg-[var(--badge-bg)]"
            {...{ style: { '--badge-bg': badgeColor } as React.CSSProperties }}
          >
            {badgeText}
          </div>

          {/* Title and Description */}
          <div className="flex-grow">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 uppercase tracking-tighter italic leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
              {title}
            </h3>
            <p className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] md:tracking-[0.2em] max-w-[140px] md:max-w-[240px] leading-relaxed group-hover:text-gray-300 transition-colors">
              {description}
            </p>
          </div>
          
          {/* Call to Action */}
          <motion.div
            whileHover={{ x: 10 }}
            className="group mt-auto inline-flex items-center gap-2 md:gap-4 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-titan-orange hover:text-white transition-all cursor-pointer"
          >
            <div className="h-[2px] w-4 md:w-8 bg-titan-orange group-hover:w-16 transition-all duration-500" />
            {ctaText}
            <div className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-titan-orange text-white shadow-[0_0_15px_rgba(242,130,36,0.3)] group-hover:bg-white group-hover:text-titan-orange transition-all duration-500">
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 stroke-[3]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Outer Border Glow */}
      <div className="absolute -inset-1 rounded-[2.6rem] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
    </motion.div>
  );
};
