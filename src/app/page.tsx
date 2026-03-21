"use client";

import React from "react";
import { motion } from "framer-motion";
import GlitchText from "@/components/atoms/GlitchText";
import NeonButton from "@/components/atoms/NeonButton";
import ParticleBackground from "@/components/atoms/ParticleBackground";
import SocialOrb from "@/components/atoms/SocialOrb";
import StatusIndicator from "@/components/atoms/StatusIndicator";
import { FaArrowRight, FaCode, FaGamepad, FaRocket, FaMicrochip, FaGraduationCap } from "react-icons/fa";
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

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-portfolio-neon-blue/40 bg-portfolio-neon-blue/10 text-portfolio-neon-blue font-spacemono text-xs uppercase tracking-widest">
              <FaGraduationCap className="inline" />
              Engineering Student · Class of 2022
            </span>
          </motion.div>

          {/* Main Heading — Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-2"
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold">
              <GlitchText text="KIRTAN KUNWAR" intensity="medium" glitchColor="blue" animated />
            </h1>
          </motion.div>

          {/* Subtitle Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-xl md:text-2xl text-portfolio-text-secondary font-rajdhani tracking-wide">
              Software Engineer · Problem Solver · Tech Enthusiast
            </p>
            <p className="text-base md:text-lg text-portfolio-text-muted mt-2 font-spacemono">
              {">"} Turning coffee &amp; code into real-world solutions
            </p>
          </motion.div>

          {/* About Me Blurb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-portfolio-text-secondary font-rajdhani text-lg leading-relaxed border border-portfolio-neon-blue/20 bg-portfolio-neon-blue/5 rounded-lg px-6 py-4">
              Hi, I&apos;m <span className="text-portfolio-neon-blue font-bold">Kirtan</span> — an engineering student
              passionate about building elegant software and solving complex problems.
              I love diving into{" "}
              <span className="text-portfolio-neon-green">full-stack development</span>,
              exploring <span className="text-portfolio-neon-pink">AI &amp; systems design</span>, and
              competing in hackathons. When I&apos;m not coding, you&apos;ll find me gaming or tinkering with new tech.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-10 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-portfolio-neon-green">20+</div>
              <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
                Projects Built
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-portfolio-neon-blue">
                <FaMicrochip className="inline mb-1" /> CS
              </div>
              <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
                Engineering Major
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-portfolio-neon-pink">3+</div>
              <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
                Hackathons
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-portfolio-neon-yellow">1000+</div>
              <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
                Hours Gaming
              </div>
            </div>
          </motion.div>

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
                  Skills &amp; Experience
                </NeonButton>
              </Link>
              <Link href="/about">
                <NeonButton variant="green" size="lg" glowIntensity="high">
                  <FaGraduationCap className="inline mr-2" />
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
          <div>$ whoami</div>
          <div className="text-portfolio-text-secondary">&gt; Kirtan Kunwar</div>
          <div className="text-portfolio-text-secondary">&gt; Engineering Student</div>
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