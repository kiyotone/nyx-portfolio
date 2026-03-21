"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { NavigationOverlayProps } from "./NavigationOverlay.types";
import { mainNavigation } from "@/config/navigation";
import GlitchText from "@/components/atoms/GlitchText";

// Generated once at module load — not during render, so Math.random() is fine
const PARTICLES = Array.from({ length: 30 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 2 + Math.random() * 2,
  delay: Math.random() * 2,
}));

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-portfolio-bg-primary/95 backdrop-blur-lg"
          onClick={onClose}
        >
          <div className="scanlines" />

          {/* Particles */}
          <div className="absolute inset-0">
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-portfolio-neon-blue rounded-full"
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
              />
            ))}
          </div>

          {/* Content */}
          <div
            className="relative z-10 h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16"
            >
              <GlitchText
                text="NAVIGATION"
                glitchColor="blue"
                className="text-4xl md:text-6xl font-orbitron font-black"
              />
            </motion.div>

            <nav className="space-y-4 w-full max-w-md px-6">
              {mainNavigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    onClick={() => item.href && handleNavigate(item.href)}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-full text-left p-6 rounded-lg font-rajdhani font-bold text-2xl
                      border-2 transition-all flex items-center gap-4
                      ${
                        isActive
                          ? "bg-portfolio-neon-blue/20 border-portfolio-neon-blue text-portfolio-neon-blue shadow-neon-blue"
                          : "bg-portfolio-bg-secondary/50 border-portfolio-bg-tertiary text-portfolio-text-secondary hover:border-portfolio-neon-pink hover:text-portfolio-neon-pink hover:shadow-neon-pink"
                      }
                    `}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-portfolio-neon-green">&gt;</span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <div className="text-xs text-portfolio-text-muted mt-1 font-spacemono">
                          CURRENT_LOCATION
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
              className="mt-16 text-portfolio-text-muted text-sm font-spacemono"
            >
              Press <span className="text-portfolio-neon-pink">ESC</span> to close
            </motion.div>
          </div>

          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-portfolio-neon-pink opacity-50" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-portfolio-neon-pink opacity-50" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-portfolio-neon-pink opacity-50" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-portfolio-neon-pink opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationOverlay;
