"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Zap, Shield, Skull, Star } from "lucide-react";
import GameCard from "@/components/molecules/GameCard";
import AchievementBadge from "@/components/atoms/AchievementBadge";
import HomeButton from "@/components/atoms/HomeButton";
import FilterBar from "@/components/molecules/FilterBar";
import { GAMES, GAME_CATEGORIES, GAMING_ACHIEVEMENTS } from "@/config/constants";

// Map achievement titles to icons
const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  Completionist: <Trophy />,
  "Speed Demon": <Zap />,
  "Diamond Grind": <Star />,
  "Void Walker": <Skull />,
  Deathless: <Shield />,
  "Sharp Shooter": <Target />,
};

export default function GamingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredGames =
    activeCategory === "all" ? GAMES : GAMES.filter((g) => g.category === activeCategory);

  // Total hours across all games
  const totalHours = GAMES.reduce((sum, g) => sum + g.hoursPlayed, 0);

  return (
    <div className="min-h-screen bg-portfolio-bg-primary py-20 px-6">
      <HomeButton />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-black gradient-text-gaming mb-4">
            {/* GAMING */}
          </h1>
          <p className="text-xl text-portfolio-text-secondary font-rajdhani">
            Virtual worlds conquered and quests completed
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-10 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl font-orbitron font-bold text-portfolio-neon-pink">
              {GAMES.length}
            </div>
            <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
              Games
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-orbitron font-bold text-portfolio-neon-blue">
              {totalHours.toLocaleString()}+
            </div>
            <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
              Hours Played
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-orbitron font-bold text-portfolio-neon-green">
              {GAMING_ACHIEVEMENTS.filter((a) => a.unlocked).length}
            </div>
            <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
              Achievements
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-orbitron font-bold text-portfolio-neon-pink">0</div>
            <div className="text-xs text-portfolio-text-secondary font-rajdhani uppercase tracking-widest mt-1">
              Favourites
            </div>
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-3xl font-rajdhani font-bold text-portfolio-neon-pink">
              &gt; GAMES.db
            </h2>
            <FilterBar
              filters={[...GAME_CATEGORIES]}
              activeFilter={activeCategory}
              onFilterChange={setActiveCategory}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {/* Silksong gets an "ANTICIPATED" banner */}
                <div className="relative">
                  {"anticipated" in game && game.anticipated && (
                    <div className="absolute -top-2 -right-2 z-10 px-2 py-0.5 bg-portfolio-neon-pink text-black text-[10px] font-orbitron font-bold rounded tracking-widest">
                      AWAITED
                    </div>
                  )}
                  <GameCard {...game} />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <p className="text-center text-portfolio-text-muted font-rajdhani text-xl py-12">
              No games in this category
            </p>
          )}
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-rajdhani font-bold text-portfolio-neon-green mb-8">
            &gt; ACHIEVEMENTS.log
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMING_ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index }}
              >
                <AchievementBadge
                  {...achievement}
                  icon={ACHIEVEMENT_ICONS[achievement.title] ?? <Trophy />}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
