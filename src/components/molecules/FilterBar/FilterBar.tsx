"use client";

import React from "react";
import { motion } from "framer-motion";
import { FilterBarProps } from "./FilterBar.types";

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <motion.button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              px-5 py-2.5 rounded-lg font-rajdhani font-semibold uppercase tracking-wider
              border-2 transition-all ${
                isActive
                  ? "border-portfolio-neon-blue bg-portfolio-neon-blue text-portfolio-bg-primary"
                  : "border-portfolio-bg-tertiary bg-portfolio-bg-secondary text-portfolio-text-secondary"
              }
            `}
            whileHover={
              !isActive
                ? {
                    borderColor: "#00f0ff",
                    color: "#00f0ff",
                  }
                : {}
            }
            whileTap={{ scale: 0.95 }}
          >
            {filter.icon && <span className="mr-2">{filter.icon}</span>}
            {filter.label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default FilterBar;
