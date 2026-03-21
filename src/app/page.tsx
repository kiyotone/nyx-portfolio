"use client";

import React from "react";
import { motion } from "framer-motion";
import GlitchText from "@/components/atoms/GlitchText";
import NeonButton from "@/components/atoms/NeonButton";
import ParticleBackground from "@/components/atoms/ParticleBackground";
import SocialOrb from "@/components/atoms/SocialOrb";
import StatusIndicator from "@/components/atoms/StatusIndicator";
import { FaArrowRight, FaCode, FaGamepad, FaRocket } from "react-icons/fa";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/config/constants";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground particleCount={150} color="#00f0ff" speed="medium" />

      {/* Scanlines Effect */}
      <div className="scanlines" />

      {/* Grid Background */}
      <div className="grid-background fixed inset-0" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <StatusIndicator status="online" showLabel size="md" />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-8xl font-orbitron font-bold mb-4">
              <GlitchText text="NEXUS PORTFOLIO" intensity="medium" glitchColor="blue" animated />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl text-portfolio-text-secondary font-rajdhani">
              Full Stack Developer • Gaming Enthusiast • Tech Explorer
            </p>
            <p className="text-lg md:text-xl text-portfolio-text-muted mt-2 font-spacemono">
              {">"} Building the future, one line of code at a time
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-portfolio-neon-green">50+</div>
              <div className="text-sm text-portfolio-text-secondary font-rajdhani uppercase">
                Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-portfolio-neon-pink">5+</div>
              <div className="text-sm text-portfolio-text-secondary font-rajdhani uppercase">
                Years XP
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-portfolio-neon-blue">1000+</div>
              <div className="text-sm text-portfolio-text-secondary font-rajdhani uppercase">
                Hours Gaming
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center gap-4 mb-12"
          >
            {/* Top row */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/projects">
                <NeonButton variant="blue" size="lg" glowIntensity="high">
                  <FaCode className="inline mr-2" />
                  View Projects
                  <FaArrowRight className="inline ml-2" />
                </NeonButton>
              </Link>
              <Link href="/skills">
                <NeonButton variant="yellow" size="lg" glowIntensity="high">
                  <FaRocket className="inline mr-2" />
                  Skills & Experience
                </NeonButton>
              </Link>
              <Link href="/about">
                <NeonButton variant="green" size="lg" glowIntensity="high">
                  <FaRocket className="inline mr-2" />
                  About Me
                </NeonButton>
              </Link>
            </div>

            {/* Gaming — below */}
            <Link href="/gaming">
              <NeonButton variant="pink" size="lg" glowIntensity="high">
                <FaGamepad className="inline mr-2" />
                Gaming Profile
              </NeonButton>
            </Link>
          </motion.div>

          {/* Social Links */}
          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex justify-center gap-4"
          >
            {SOCIAL_LINKS.map(({ platform, url }) => (
              <SocialOrb key={platform} platform={platform} url={url} size="md" />
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-16"
          >
            <div className="flex flex-col items-center">
              <span className="text-portfolio-text-muted font-spacemono text-sm mb-2">
                SCROLL DOWN
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-portfolio-neon-blue rounded-full flex justify-center p-2"
              >
                <motion.div className="w-1 h-2 bg-portfolio-neon-blue rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Terminal Corner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="fixed bottom-8 left-8 terminal-window p-4 hidden md:block"
      >
        <div className="text-portfolio-neon-green font-spacemono text-xs">
          <div>$ status --check</div>
          <div className="text-portfolio-text-secondary">&gt; System online</div>
          <div className="text-portfolio-text-secondary">&gt; Ready to build</div>
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            _
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
