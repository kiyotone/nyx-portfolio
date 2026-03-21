"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { NeonButtonProps } from "./NeonButton.types";

const VARIANTS = {
  blue: { color: "#00f0ff" },
  pink: { color: "#ff006e" },
  green: { color: "#39ff14" },
  purple: { color: "#bf00ff" },
  yellow: { color: "#ffff00" },
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const GLOW = {
  low: "0 0 10px",
  medium: "0 0 20px",
  high: "0 0 35px",
};

const NeonButton: React.FC<NeonButtonProps> = ({
  variant = "blue",
  size = "md",
  glowIntensity = "medium",
  children,
  className = "",
  disabled = false,
  onClick,
  type,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);
  const { color } = VARIANTS[variant];
  const glowStr = GLOW[glowIntensity];

  return (
    <motion.button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      onHoverStart={() => !disabled && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        boxShadow: hovered
          ? `${glowStr} ${color}, inset 0 0 20px ${color}22`
          : "0 0 0px transparent",
        backgroundColor: hovered ? color : "transparent",
        color: hovered ? "#0a0e27" : color,
        scale: hovered ? 1.05 : 1,
      }}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden font-rajdhani font-bold uppercase tracking-wider
        border-2 rounded-sm ${SIZES[size]} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      style={{ borderColor: color }}
    >
      {/* Ripple fill */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-sm"
        animate={{
          opacity: hovered ? 1 : 0,
          backgroundColor: hovered ? `${color}18` : "transparent",
        }}
        transition={{ duration: 0.25 }}
      />

      <span className="relative z-10 flex items-center justify-center gap-1">{children}</span>
    </motion.button>
  );
};

export default NeonButton;
