// components/AnimatedBackground.tsx
'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-[rgb(var(--color-background))] opacity-90" /> {/* Capa base oscura */}
      
      {/* Orbe Azul (Primary Glow) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[rgb(var(--color-primary-glow))] blur-[120px] opacity-30 mix-blend-screen"
      />

       {/* Orbe Violeta (Secondary Glow) */}
      <motion.div
         animate={{
            scale: [1, 1.1, 1],
            x: [0, 100, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        className="absolute bottom-[-10%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-[rgb(var(--color-secondary-glow))] blur-[150px] opacity-20 mix-blend-screen"
      />
      
      {/* Ruido sutil para textura premium */}
       <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
}