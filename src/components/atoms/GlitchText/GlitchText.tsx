"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlitchTextProps } from "./GlitchText.types";

const GLITCH_COLORS = {
  blue:   "#00f0ff",
  pink:   "#ff006e",
  green:  "#39ff14",
  purple: "#bf00ff",
};

const INTENSITY_MAP = {
  low:    { x: 1, y: 1 },
  medium: { x: 2, y: 2 },
  high:   { x: 4, y: 4 },
};

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = "",
  intensity = "medium",
  glitchColor = "blue",
  animated = true,
}) => {
  const { x, y } = INTENSITY_MAP[intensity];
  const color     = GLITCH_COLORS[glitchColor];

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        animate={animated ? {
          x: [0, -x, x, -x, 0],
          y: [0,  y, -y,  y, 0],
        } : undefined}
        transition={animated ? {
          duration:   1,
          repeat:     Infinity,
          repeatType: "loop" as const,
          ease:       "linear" as const,   // ← "linear" as const, not string
        } : undefined}
        style={{
          textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
        }}
      >
        {text}
      </motion.span>

      {animated && (
        <>
          <span
            className="absolute top-0 left-0 -z-10 opacity-70"
            style={{
              color,
              clipPath: "inset(0 0 90% 0)",
              animation: "glitch-1 2s infinite linear alternate-reverse",
            }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 -z-10 opacity-70"
            style={{
              color,
              clipPath: "inset(90% 0 0 0)",
              animation: "glitch-2 2s infinite linear alternate-reverse",
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20%       { transform: translate(-2px, 2px); }
          40%       { transform: translate(2px, -2px); }
          60%       { transform: translate(-2px, -2px); }
          80%       { transform: translate(2px, 2px); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20%       { transform: translate(2px, -2px); }
          40%       { transform: translate(-2px, 2px); }
          60%       { transform: translate(2px, 2px); }
          80%       { transform: translate(-2px, -2px); }
        }
      `}</style>
    </div>
  );
};

export default GlitchText;