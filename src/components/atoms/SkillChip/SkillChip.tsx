"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillChipProps } from "./SkillChip.types";

const colors = {
  blue: "#00f0ff",
  pink: "#ff006e",
  green: "#39ff14",
  purple: "#bf00ff",
};

const sizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

const SkillChip: React.FC<SkillChipProps> = ({
  name,
  icon,
  level,
  color = "green",
  size = "md",
  className = "",
  onClick,
}) => {
  const chipColor = colors[color];
  const sizeClass = sizes[size];

  return (
    <motion.div
      className={`
        inline-flex items-center gap-2 rounded-full font-semibold
        ${sizeClass} ${className}
        ${onClick ? "cursor-pointer" : ""}
      `}
      style={{
        backgroundColor: "var(--bg-tertiary)",
        border: `1px solid ${chipColor}`,
        color: chipColor,
      }}
      whileHover={onClick ? { scale: 1.1, boxShadow: `0 0 10px ${chipColor}` } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{name}</span>
      {level !== undefined && (
        <span className="ml-1 opacity-75">
          {"★".repeat(level)}
          {"☆".repeat(5 - level)}
        </span>
      )}
    </motion.div>
  );
};

export default SkillChip;
