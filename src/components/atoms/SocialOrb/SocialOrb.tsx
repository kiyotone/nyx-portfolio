"use client";

import React from "react";
import { motion } from "framer-motion";
import { SocialOrbProps } from "./SocialOrb.types";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaEnvelope,
  FaSteam,
  FaXbox,
  FaPlaystation,
} from "react-icons/fa";

const platformIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  discord: FaDiscord,
  email: FaEnvelope,
  steam: FaSteam,
  xbox: FaXbox,
  playstation: FaPlaystation,
};

const platformColors = {
  github: "#ffffff",
  linkedin: "#0077b5",
  twitter: "#1da1f2",
  discord: "#5865f2",
  email: "#00f0ff",
  steam: "#1b2838",
  xbox: "#107c10",
  playstation: "#003087",
};

const sizes = {
  sm: "w-10 h-10 text-lg",
  md: "w-14 h-14 text-2xl",
  lg: "w-20 h-20 text-3xl",
};

const SocialOrb: React.FC<SocialOrbProps> = ({ platform, url, size = "md", className = "" }) => {
  const Icon = platformIcons[platform];
  const color = platformColors[platform];
  const sizeClass = sizes[size];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${sizeClass} rounded-full flex items-center justify-center
        bg-portfolio-bg-secondary border-2 cursor-pointer
        ${className}
      `}
      style={{
        borderColor: color,
        color: color,
      }}
      whileHover={{
        scale: 1.2,
        rotate: 360,
        boxShadow: `0 0 20px ${color}`,
        backgroundColor: color,
        color: "#0a0e27",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Icon />
    </motion.a>
  );
};

export default SocialOrb;
