"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProgressBarProps } from "./ProgressBar.types";

const colors = {
  blue: {
    from: "#00f0ff",
    to: "#0080ff",
  },
  pink: {
    from: "#ff006e",
    to: "#ff5e9d",
  },
  green: {
    from: "#39ff14",
    to: "#7fff00",
  },
  purple: {
    from: "#bf00ff",
    to: "#9d00ff",
  },
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = "blue",
  label,
  showPercentage = true,
  animated = true,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);
  const gradient = colors[color];

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayValue(percentage), 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setDisplayValue(percentage), 0);
      return () => clearTimeout(timer);
    }
  }, [percentage, animated]);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2 text-sm">
          {label && <span className="text-portfolio-text-secondary font-rajdhani">{label}</span>}
          {showPercentage && (
            <span className="font-bold font-spacemono" style={{ color: gradient.from }}>
              {Math.round(displayValue)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-portfolio-bg-tertiary rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
            boxShadow: `0 0 10px ${gradient.from}`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{
            duration: animated ? 1 : 0,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
