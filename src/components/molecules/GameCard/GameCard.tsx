"use client";

import React from "react";
import { motion } from "framer-motion";
import { GameCardProps } from "./GameCard.types";
import { FaSteam, FaXbox, FaPlaystation } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";

const platformIcons = {
  steam: FaSteam,
  xbox: FaXbox,
  playstation: FaPlaystation,
  switch: SiNintendoswitch,
  pc: FaSteam,
};

const GameCard: React.FC<GameCardProps> = ({
  title,
  platform,
  coverImage,
  hoursPlayed,
  achievements,
  totalAchievements,
  favorite = false,
  genre,
  className = "",
}) => {
  const PlatformIcon = platformIcons[platform];
  const achievementPercentage =
    achievements && totalAchievements ? (achievements / totalAchievements) * 100 : 0;

  return (
    <motion.div
      className={`
        relative bg-portfolio-bg-secondary rounded-lg overflow-hidden
        border border-portfolio-bg-tertiary ${className}
      `}
      whileHover={{
        scale: 1.05,
        borderColor: "#ff006e",
        boxShadow: "0 10px 30px rgba(255, 0, 110, 0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      {favorite && <div className="absolute top-2 right-2 z-10 text-2xl">⭐</div>}

      {/* Cover Image */}
      <div className="relative w-full h-40 overflow-hidden">
        {coverImage ? (
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-portfolio-neon-pink to-portfolio-neon-purple flex items-center justify-center">
            <span className="text-3xl opacity-30">🎮</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-rajdhani font-bold text-portfolio-text-primary flex-1">
            {title}
          </h3>
          <PlatformIcon className="text-portfolio-neon-blue text-xl" />
        </div>

        {genre && <p className="text-xs text-portfolio-text-muted mb-3">{genre}</p>}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-portfolio-text-secondary">Hours Played:</span>
            <span className="text-portfolio-neon-green font-bold">{hoursPlayed}h</span>
          </div>

          {achievements !== undefined && totalAchievements !== undefined && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-portfolio-text-secondary">Achievements:</span>
                <span className="text-portfolio-neon-blue font-bold">
                  {achievements}/{totalAchievements}
                </span>
              </div>
              <div className="w-full h-1.5 bg-portfolio-bg-tertiary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-portfolio-neon-blue to-portfolio-neon-green"
                  initial={{ width: 0 }}
                  animate={{ width: `${achievementPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
