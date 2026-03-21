"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillTreeNodeProps } from "./SkillTreeNode.types";

const SkillTreeNode: React.FC<SkillTreeNodeProps> = ({
  name,
  level,
  unlocked = true,
  children,
  onUnlock,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        className={`
          relative w-24 h-24 rounded-full border-2 flex items-center justify-center
          cursor-pointer ${unlocked ? "bg-portfolio-bg-secondary" : "bg-portfolio-bg-tertiary"}
        `}
        style={{
          borderColor: unlocked ? "#00f0ff" : "#4a5568",
        }}
        whileHover={unlocked ? { scale: 1.1, boxShadow: "0 0 20px #00f0ff" } : {}}
        onClick={onUnlock}
      >
        {unlocked ? (
          <div className="text-center">
            <div className="text-xs font-rajdhani font-bold text-portfolio-neon-blue">{name}</div>
            <div className="text-xs text-portfolio-neon-green mt-1">Lv. {level}</div>
          </div>
        ) : (
          <div className="text-2xl">🔒</div>
        )}
      </motion.div>

      {children && children.length > 0 && (
        <div className="mt-8 flex gap-8">
          {children.map((child, index) => (
            <SkillTreeNode key={index} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillTreeNode;
