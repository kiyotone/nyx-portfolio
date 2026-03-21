"use client";

import React from "react";
import { motion } from "framer-motion";
import { TimelineItemProps } from "./TimelineItem.types";

const typeColors = {
  work: "#00f0ff",
  education: "#39ff14",
  achievement: "#ffd700",
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  date,
  description,
  type,
  icon,
  current = false,
  className = "",
}) => {
  const color = typeColors[type];

  return (
    <motion.div
      className={`relative pl-8 pb-8 border-l-2 ${className}`}
      style={{ borderColor: color }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline Dot */}
      <motion.div
        className="absolute -left-3 top-0 w-6 h-6 rounded-full border-4 border-portfolio-bg-primary flex items-center justify-center"
        style={{ backgroundColor: color }}
        whileHover={{ scale: 1.5 }}
      >
        {icon && <span className="text-xs">{icon}</span>}
      </motion.div>

      {/* Content */}
      <div className="bg-portfolio-bg-secondary rounded-lg p-5 border border-portfolio-bg-tertiary">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-rajdhani font-bold" style={{ color }}>
              {title}
            </h3>
            {company && <p className="text-portfolio-text-secondary font-semibold">{company}</p>}
          </div>
          {current && (
            <span className="px-3 py-1 bg-portfolio-neon-green text-portfolio-bg-primary rounded-full text-xs font-bold">
              CURRENT
            </span>
          )}
        </div>
        <p className="text-sm text-portfolio-text-muted mb-3">{date}</p>
        <p className="text-portfolio-text-secondary leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
