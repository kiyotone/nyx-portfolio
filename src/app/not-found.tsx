"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlitchText from "@/components/atoms/GlitchText";
import NeonButton from "@/components/atoms/NeonButton";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-portfolio-bg-primary">
      <div className="scanlines" />
      <div className="grid-background fixed inset-0" />

      <div className="relative z-10 text-center px-6">
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlitchText
            text="404"
            intensity="high"
            glitchColor="pink"
            animated
            className="text-[10rem] md:text-[16rem] font-orbitron font-black leading-none"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-2xl font-rajdhani text-portfolio-text-secondary mb-2">
            SIGNAL LOST — PAGE NOT FOUND
          </p>
          <p className="text-sm font-spacemono text-portfolio-text-muted">
            {">"} The sector you&apos;re looking for doesn&apos;t exist in this dimension.
          </p>
        </motion.div>

        {/* Terminal error box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="inline-block mb-10 text-left bg-black/40 border border-portfolio-neon-pink/30 rounded-lg p-4 font-spacemono text-xs"
        >
          <p className="text-portfolio-neon-pink/60 mb-2 tracking-widest text-[10px]">ERROR LOG</p>
          <p className="text-portfolio-text-secondary">&gt; Route resolution failed</p>
          <p className="text-portfolio-text-secondary">
            &gt; Status: <span className="text-portfolio-neon-pink">404 NOT_FOUND</span>
          </p>
          <p className="text-portfolio-text-secondary">&gt; Suggestion: return to base</p>
          <motion.span
            className="inline-block w-1.5 h-3 bg-portfolio-neon-pink ml-1 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/">
            <NeonButton variant="blue" size="lg" glowIntensity="high">
              <FaHome className="inline mr-2" />
              Go Home
            </NeonButton>
          </Link>
          <button onClick={() => window.history.back()}>
            <NeonButton variant="green" size="md" glowIntensity="medium">
              <FaArrowLeft className="inline mr-2" />
              Go Back
            </NeonButton>
          </button>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-5 left-5 w-10 h-10 border-l-2 border-t-2 border-portfolio-neon-pink opacity-40" />
      <div className="absolute top-5 right-5 w-10 h-10 border-r-2 border-t-2 border-portfolio-neon-pink opacity-40" />
      <div className="absolute bottom-5 left-5 w-10 h-10 border-l-2 border-b-2 border-portfolio-neon-pink opacity-40" />
      <div className="absolute bottom-5 right-5 w-10 h-10 border-r-2 border-b-2 border-portfolio-neon-pink opacity-40" />
    </div>
  );
}
