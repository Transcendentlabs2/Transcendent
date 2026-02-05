'use client';

import { motion, Variants } from 'framer-motion';

export default function PeptideStructure() {
  
  // Tipado explícito Variants
  const nodeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }),
    pulse: {
        scale: [1, 1.05, 1],
        filter: [
            'brightness(1) blur(0px)',
            'brightness(1.3) blur(2px)',
            'brightness(1) blur(0px)'
        ],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        }
    }
  };

  const lineVariants: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: {
          pathLength: 1,
          opacity: 0.4,
          transition: { duration: 1.5, ease: "easeInOut" }
      }
  }

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto perspective-1000">
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial="hidden"
        animate="visible"
        style={{ rotateX: 15, rotateY: 15 }}
      >
        <motion.g
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             style={{ transformOrigin: '200px 200px' }}
        >
            {/* Conexiones */}
            <motion.line x1="100" y1="100" x2="300" y2="300" stroke="white" strokeWidth="2" variants={lineVariants} />
            <motion.line x1="300" y1="100" x2="100" y2="300" stroke="white" strokeWidth="2" variants={lineVariants} />
            <motion.line x1="200" y1="50" x2="200" y2="350" stroke="white" strokeWidth="2" variants={lineVariants} />
            <motion.circle cx="200" cy="200" r="80" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease:"linear" }} style={{ transformOrigin: '200px 200px' }}/>

            {/* Nodos */}
            <motion.circle
                custom={0}
                variants={nodeVariants}
                animate={["visible", "pulse"]}
                cx="200" cy="200" r="25"
                fill="url(#gradCentral)"
                filter="url(#glowCentral)"
            />

            <motion.circle custom={1} variants={nodeVariants} animate={["visible", "pulse"]} cx="100" cy="100" r="12" fill="white" className="opacity-80" />
            <motion.circle custom={2} variants={nodeVariants} animate={["visible", "pulse"]} cx="300" cy="300" r="15" fill="white" className="opacity-80" />
            <motion.circle custom={3} variants={nodeVariants} animate={["visible", "pulse"]} cx="300" cy="100" r="12" fill="white" className="opacity-80" />
            <motion.circle custom={4} variants={nodeVariants} animate={["visible", "pulse"]} cx="100" cy="300" r="15" fill="white" className="opacity-80" />
            <motion.circle custom={5} variants={nodeVariants} animate={["visible", "pulse"]} cx="200" cy="50" r="10" fill="white" className="opacity-60" />
            <motion.circle custom={6} variants={nodeVariants} animate={["visible", "pulse"]} cx="200" cy="350" r="10" fill="white" className="opacity-60" />

            <defs>
                <radialGradient id="gradCentral" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(25)">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="rgb(var(--color-primary-glow))" />
                </radialGradient>
                 <filter id="glowCentral">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
        </motion.g>
      </motion.svg>
    </div>
  );
}