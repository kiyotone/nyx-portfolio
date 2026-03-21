"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
  onComplete?: () => void;
}

const BOOT_LINES = [
  "> Initializing neural matrix...",
  "> Mounting file system...",
  "> Calibrating sensors...",
  "> Loading quantum core...",
  "> Establishing uplink...",
  "> All systems nominal.",
];

const LINE_INTERVAL = 420; // ms per line
const EXIT_DELAY = 700; // ms pause after last line

export default function LoadingScreen({ message = "NEXUS", onComplete }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          // call onComplete after the 600ms exit animation
          setTimeout(() => {
            if (!calledRef.current) {
              calledRef.current = true;
              onComplete?.();
            }
          }, 600);
        }, EXIT_DELAY);
      }
    }, LINE_INTERVAL);

    return () => clearInterval(interval);
  }, []); // intentionally empty — runs once on mount

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-portfolio-bg-primary overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#00f0ff 1px, transparent 1px),
                                linear-gradient(90deg, #00f0ff 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Corner brackets */}
          {[
            "top-5 left-5 border-l-2 border-t-2",
            "top-5 right-5 border-r-2 border-t-2",
            "bottom-5 left-5 border-l-2 border-b-2",
            "bottom-5 right-5 border-r-2 border-b-2",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-10 h-10 border-portfolio-neon-pink opacity-40 ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            />
          ))}

          {/* Title */}
          <motion.h1
            className="font-orbitron font-black text-6xl md:text-8xl text-portfolio-neon-blue mb-12 tracking-widest"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textShadow: "0 0 40px var(--portfolio-neon-blue)" }}
          >
            {message}
          </motion.h1>

          {/* Dual-ring spinner */}
          <div className="relative w-24 h-24 mb-10">
            {/* Static track */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="var(--portfolio-bg-tertiary)"
                strokeWidth="3"
              />
            </svg>

            {/* Outer arc — clockwise */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 96 96"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="var(--portfolio-neon-blue)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="60 204"
                style={{ filter: "drop-shadow(0 0 6px var(--portfolio-neon-blue))" }}
              />
            </motion.svg>

            {/* Inner arc — counter-clockwise */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 96 96"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="48"
                cy="48"
                r="30"
                fill="none"
                stroke="var(--portfolio-neon-pink)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="30 158"
                style={{ filter: "drop-shadow(0 0 4px var(--portfolio-neon-pink))" }}
              />
            </motion.svg>
          </div>

          {/* Boot log terminal */}
          <div className="w-full max-w-sm mx-6 bg-black/40 border border-portfolio-neon-blue/30 rounded-lg p-4 font-spacemono text-xs space-y-1.5 min-h-[160px]">
            <p className="text-portfolio-neon-blue/50 mb-3 text-[10px] tracking-widest">
              SYSTEM BOOT LOG
            </p>
            <AnimatePresence>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    line.includes("nominal")
                      ? "text-portfolio-neon-green"
                      : "text-portfolio-text-secondary"
                  }
                >
                  {line}
                  {/* blinking cursor only on the last line */}
                  {i === visibleLines.length - 1 && (
                    <motion.span
                      className="inline-block w-1.5 h-3 bg-current ml-1 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
