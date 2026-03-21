"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { HomeButtonProps } from "./HomeButton.types";

const HomeButton: React.FC<HomeButtonProps> = ({ className = "" }) => {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push("/")}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`
        fixed top-6 left-6 z-40 flex items-center gap-2
        px-4 py-2 bg-portfolio-bg-secondary/80 backdrop-blur-lg
        border border-portfolio-neon-blue rounded-lg
        font-orbitron font-bold text-portfolio-neon-blue
        transition-all hover:shadow-neon-blue
        ${className}
      `}
    >
      <ChevronLeft className="w-5 h-5" />
      <span>NEXUS</span>
    </motion.button>
  );
};

export default HomeButton;
