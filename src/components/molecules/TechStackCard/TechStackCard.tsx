"use client";

import React from "react";
import { motion } from "framer-motion";
import { TechStackCardProps } from "./TechStackCard.types";
import ProgressBar from "@/components/atoms/ProgressBar";

const categoryColors = {
  frontend: "blue" as const,
  backend: "green" as const,
  devops: "purple" as const,
  gaming: "pink" as const,
};

const TechStackCard: React.FC<TechStackCardProps> = ({
  name,
  icon,
  description,
  proficiency,
  yearsOfExperience,
  category,
  className = "",
}) => {
  const color = categoryColors[category];

  return (
    <motion.div
      className={`bg-portfolio-bg-secondary border border-portfolio-bg-tertiary rounded-lg p-5 ${className}`}
      whileHover={{
        borderColor: "#00f0ff",
        boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-4 mb-4">
        {icon && <div className="text-3xl text-portfolio-neon-blue">{icon}</div>}
        <div className="flex-1">
          <h3 className="text-lg font-rajdhani font-bold text-portfolio-text-primary">{name}</h3>
          <p className="text-sm text-portfolio-text-secondary mt-1">{description}</p>
          {yearsOfExperience && (
            <p className="text-xs text-portfolio-text-muted mt-2">
              {yearsOfExperience} {yearsOfExperience === 1 ? "year" : "years"} experience
            </p>
          )}
        </div>
      </div>

      <ProgressBar value={proficiency} max={100} color={color} showPercentage={true} />
    </motion.div>
  );
};

export default TechStackCard;
