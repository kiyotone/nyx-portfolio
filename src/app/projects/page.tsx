"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/molecules/ProjectCard";
import FilterBar from "@/components/molecules/FilterBar";
import HomeButton from "@/components/atoms/HomeButton";
import { PROJECTS, PROJECT_FILTERS } from "@/config/constants";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-portfolio-bg-primary py-20 px-6">
      <HomeButton />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-black gradient-text-neon mb-4">
            {/* PROJECTS */}
          </h1>
          <p className="text-xl text-portfolio-text-secondary font-rajdhani">
            Things I&apos;ve built with code and caffeine
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <FilterBar
            filters={[...PROJECT_FILTERS]}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-portfolio-text-muted font-rajdhani">
              No projects found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
