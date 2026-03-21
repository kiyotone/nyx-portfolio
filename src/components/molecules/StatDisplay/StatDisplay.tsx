"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatDisplayProps } from "./StatDisplay.types";

const colors = {
  blue: "#00f0ff",
  pink: "#ff006e",
  green: "#39ff14",
  purple: "#bf00ff",
};

const StatDisplay: React.FC<StatDisplayProps> = ({
  label,
  value,
  icon,
  color = "blue",
  animated = true,
  suffix = "",
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState<number>(typeof value === "number" ? value : 0);
  const statColor = colors[color];

  useEffect(() => {
    if (animated && typeof value === "number") {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, animated]);

  return (
    <motion.div
      className={`
        relative bg-gradient-to-br from-portfolio-bg-secondary to-portfolio-bg-tertiary
        border rounded-xl p-6 text-center overflow-hidden ${className}
      `}
      style={{ borderColor: statColor }}
      whileHover={{
        y: -10,
        boxShadow: `0 10px 30px ${statColor}33`,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br opacity-0"
        style={{
          background: `linear-gradient(45deg, transparent, ${statColor}1a, transparent)`,
        }}
        whileHover={{ opacity: 1, x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10">
        {icon && (
          <div className="text-4xl mb-3" style={{ color: statColor }}>
            {icon}
          </div>
        )}
        <div className="text-4xl font-orbitron font-bold mb-2" style={{ color: statColor }}>
          {typeof value === "string" ? value : displayValue}
          {suffix}
        </div>
        <div className="text-sm text-portfolio-text-secondary uppercase tracking-wider font-rajdhani">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default StatDisplay;
