"use client";

import React from "react";
import { motion } from "framer-motion";
import StatDisplay from "@/components/molecules/StatDisplay";
import ProgressBar from "@/components/atoms/ProgressBar";
import HomeButton from "@/components/atoms/HomeButton";
import { Code, Coffee, Gamepad2, Trophy } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-portfolio-bg-primary py-20 px-6">
      <HomeButton />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-black gradient-text-neon mb-4">
            {/* ABOUT ME */}
          </h1>
          <p className="text-xl text-portfolio-text-secondary font-rajdhani">
            Developer by day, gamer by night
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatDisplay
            label="Projects Completed"
            value={50}
            icon={<Code />}
            color="blue"
            suffix="+"
          />
          <StatDisplay label="Years Coding" value={5} icon={<Trophy />} color="green" suffix="+" />
          <StatDisplay
            label="Gaming Hours"
            value="1000"
            icon={<Gamepad2 />}
            color="pink"
            suffix="+"
          />
          <StatDisplay label="Coffee Consumed" value="∞" icon={<Coffee />} color="purple" />
        </div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-portfolio-bg-secondary border border-portfolio-neon-blue rounded-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-rajdhani font-bold text-portfolio-neon-blue mb-4">
            &gt; WHO_AM_I.exe
          </h2>
          <div className="space-y-4 text-portfolio-text-secondary font-spacemono text-sm leading-relaxed">
            <p>
              Hey there! I&apos;m a passionate full-stack developer who loves building amazing web
              experiences. When I&apos;m not coding, you&apos;ll find me conquering virtual worlds
              or theorycrafting the perfect build.
            </p>
            <p>
              I believe in writing clean, maintainable code and creating user experiences that feel
              magical. My approach combines technical excellence with creative problem-solving.
            </p>
            <p>
              Gaming isn&apos;t just a hobby for me&mdash;it&apos;s taught me valuable lessons about
              strategy, teamwork, and perseverance that I apply to my development work every day.
            </p>
          </div>
        </motion.div>

        {/* Skills Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-rajdhani font-bold text-portfolio-neon-green mb-8">
            &gt; SKILL_LEVELS.json
          </h2>
          <div className="space-y-6">
            <ProgressBar value={95} label="Frontend Development" color="blue" showPercentage />
            <ProgressBar value={85} label="Backend Development" color="green" showPercentage />
            <ProgressBar value={80} label="DevOps & Cloud" color="purple" showPercentage />
            <ProgressBar value={90} label="Gaming Skills" color="pink" showPercentage />
            <ProgressBar value={100} label="Coffee Making" color="blue" showPercentage />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
