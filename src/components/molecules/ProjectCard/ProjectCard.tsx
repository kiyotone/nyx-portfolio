"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectCardProps } from "./ProjectCard.types";
import SkillChip from "@/components/atoms/SkillChip";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  techStack,
  difficulty,
  category,
  liveUrl,
  githubUrl,
  featured = false,
  className = "",
}) => {
  const difficultyStars = "⭐".repeat(difficulty) + "☆".repeat(5 - difficulty);

  return (
    <motion.div
      className={`
        relative bg-portfolio-bg-secondary border border-transparent rounded-xl
        overflow-hidden cursor-pointer ${className}
      `}
      whileHover={{
        borderColor: "#ff006e",
        y: -10,
        rotateX: 5,
        boxShadow: "0 20px 40px rgba(255, 0, 110, 0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-portfolio-neon-green text-portfolio-bg-primary rounded-full text-xs font-bold">
          FEATURED
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black bg-opacity-70 rounded-full text-sm">
        {difficultyStars}
      </div>

      {/* Image or Gradient Placeholder */}
      <div className="relative w-full h-48 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-portfolio-neon-blue to-portfolio-neon-pink flex items-center justify-center">
            <span className="text-4xl font-bold opacity-30">PREVIEW</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-rajdhani font-bold text-portfolio-neon-blue mb-2">{title}</h3>
        <p className="text-portfolio-text-secondary text-sm mb-4 line-clamp-3">{description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <SkillChip key={index} name={tech} size="sm" color="green" />
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-portfolio-text-secondary hover:text-portfolio-neon-blue transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub /> Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-portfolio-text-secondary hover:text-portfolio-neon-pink transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
