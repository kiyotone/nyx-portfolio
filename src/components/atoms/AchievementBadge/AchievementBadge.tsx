"use client";

import React from "react";
import { motion } from "framer-motion";
import { AchievementBadgeProps } from "./AchievementBadge.types";

const rarityColors = {
  common: "#a0aec0",
  rare: "#00f0ff",
  epic: "#bf00ff",
  legendary: "#ffd700",
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon,
  unlocked = true,
  date,
  rarity = "common",
  className = "",
}) => {
  const rarityColor = rarityColors[rarity];

  return (
    <motion.div
      className={`
        relative p-4 rounded-lg border-2 
        ${unlocked ? "bg-portfolio-bg-secondary" : "bg-portfolio-bg-tertiary opacity-50"}
        ${className}
      `}
      style={{
        borderColor: unlocked ? rarityColor : "#4a5568",
      }}
      whileHover={unlocked ? { scale: 1.05, y: -5 } : {}}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="text-3xl" style={{ color: unlocked ? rarityColor : "#4a5568" }}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4
            className="font-rajdhani font-bold text-lg"
            style={{ color: unlocked ? rarityColor : "#4a5568" }}
          >
            {title}
          </h4>
          {description && (
            <p className="text-sm text-portfolio-text-secondary mt-1">
              {unlocked ? description : "???"}
            </p>
          )}
          {date && unlocked && (
            <p className="text-xs text-portfolio-text-muted mt-2">Unlocked: {date}</p>
          )}
        </div>
      </div>
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <span className="text-2xl">🔒</span>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;
