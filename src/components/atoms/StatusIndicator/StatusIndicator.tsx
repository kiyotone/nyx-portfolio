"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatusIndicatorProps } from "./StatusIndicator.types";

const statusConfig = {
  online: {
    color: "#39ff14",
    label: "Available",
  },
  busy: {
    color: "#ff006e",
    label: "Busy",
  },
  away: {
    color: "#ffd700",
    label: "Away",
  },
  offline: {
    color: "#4a5568",
    label: "Offline",
  },
};

const sizes = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = false,
  size = "md",
  className = "",
}) => {
  const config = statusConfig[status];
  const sizeClass = sizes[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative">
        <motion.div
          className={`${sizeClass} rounded-full`}
          style={{ backgroundColor: config.color }}
          animate={
            status === "online"
              ? {
                  boxShadow: [`0 0 0 0 ${config.color}00`, `0 0 0 8px ${config.color}00`],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        {status === "online" && (
          <motion.div
            className={`absolute top-0 left-0 ${sizeClass} rounded-full`}
            style={{ backgroundColor: config.color }}
            animate={{
              scale: [1, 2],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        )}
      </div>
      {showLabel && (
        <span className="text-sm font-rajdhani" style={{ color: config.color }}>
          {config.label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;
