"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Cloud, Gamepad2, Terminal, Cpu } from "lucide-react";
import TechStackCard from "@/components/molecules/TechStackCard";
import SkillChip from "@/components/atoms/SkillChip";
import HomeButton from "@/components/atoms/HomeButton";
import { TECH_STACKS, SKILLS, CATEGORY_COLORS } from "@/config/constants";

// Map icon string keys → actual Lucide components
const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 />,
  Database: <Database />,
  Cloud: <Cloud />,
  Gamepad2: <Gamepad2 />,
  Terminal: <Terminal />,
  Cpu: <Cpu />,
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-portfolio-bg-primary py-20 px-6">
      <HomeButton />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-black gradient-text-neon mb-4">
            {/* SKILLS */}
          </h1>
          <p className="text-xl text-portfolio-text-secondary font-rajdhani">
            My technical arsenal and expertise
          </p>
        </motion.div>

        {/* Tech Stack Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-rajdhani font-bold text-portfolio-neon-blue mb-8">
            &gt; CORE_TECHNOLOGIES.ts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_STACKS.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <TechStackCard
                  {...tech}
                  icon={ICON_MAP[tech.icon]}
                  category={tech.category as "frontend" | "backend" | "devops" | "gaming"}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-rajdhani font-bold text-portfolio-neon-green mb-8">
            &gt; SKILL_MATRIX.json
          </h2>

          {(Object.entries(SKILLS) as [keyof typeof SKILLS, readonly string[]][]).map(
            ([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * catIndex }}
                className="bg-portfolio-bg-secondary border border-portfolio-bg-tertiary rounded-lg p-6"
              >
                <h3 className="text-xl font-rajdhani font-bold text-portfolio-neon-pink mb-4 uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, index) => (
                    <SkillChip
                      key={skill}
                      name={skill}
                      color={CATEGORY_COLORS[category]}
                      level={5 - (index % 5)}
                    />
                  ))}
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}
