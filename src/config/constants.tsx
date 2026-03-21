import { Code2, Database, Cloud, Gamepad2, Terminal, Cpu } from "lucide-react";

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    title: "Algorithm Visualizer",
    description:
      "Interactive C++ visualizer that animates classic sorting and pathfinding algorithms step-by-step. Built from scratch with a custom rendering layer — no game-engine dependencies.",
    techStack: ["C++", "Makefile", "OpenGL"],
    difficulty: 4 as const,
    category: "tool" as const,
    featured: true,
    githubUrl: "https://github.com/kiyotone/AlgorithmVisualizer",
  },
  {
    title: "CrowdCash",
    description:
      "Peer-to-peer lending and investing platform where users can fund or request micro-loans. Features wallet management, loan listings, and a repayment tracker.",
    techStack: ["JavaScript", "Node.js", "Express", "MongoDB"],
    difficulty: 4 as const,
    category: "web" as const,
    featured: true,
    githubUrl: "https://github.com/kiyotone/CrowdCash",
  },
  {
    title: "League Characters CRUD App",
    description:
      "Full-featured CRUD application for managing League of Legends champion data. Clean REST API backend paired with a typed TypeScript frontend.",
    techStack: ["TypeScript", "React", "Node.js", "REST API"],
    difficulty: 3 as const,
    category: "web" as const,
    githubUrl: "https://github.com/kiyotone/league-characters-crud-app",
  },
  {
    title: "DataB",
    description:
      "Collaborative data management tool with a shared dashboard for real-time data entry, filtering, and visualisation across teams.",
    techStack: ["JavaScript", "React", "Firebase"],
    difficulty: 3 as const,
    category: "tool" as const,
    githubUrl: "https://github.com/bhattaraisushma/DataB",
  },
  {
    title: "Boksi — Voxel Renderer",
    description:
      "High-performance voxel rendering engine built in C++. Implements chunk management, greedy meshing, and a custom lighting model for Minecraft-style worlds.",
    techStack: ["C++", "OpenGL", "GLSL"],
    difficulty: 5 as const,
    category: "game" as const,
    featured: true,
    githubUrl: "https://github.com/Prateek61/Boksi",
  },
  {
    title: "WDSS — Wavelet Super-Sampling",
    description:
      "Research-grade Python pipeline applying wavelet-driven super-sampling to upscale low-resolution frames without deep-learning overhead.",
    techStack: ["Python", "NumPy", "PyWavelets", "Matplotlib"],
    difficulty: 5 as const,
    category: "tool" as const,
    githubUrl: "https://github.com/Prateek61/WDSS",
  },
];

// ─── Project filter tabs ──────────────────────────────────────────────────────

export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "game", label: "Game" },
  { id: "tool", label: "Tool" },
] as const;

// ─── Tech Stack Cards ────────────────────────────────────────────────────────

export const TECH_STACKS = [
  {
    name: "React / Next.js",
    icon: "Code2",
    description: "Building dynamic and responsive user interfaces",
    proficiency: 95,
    yearsOfExperience: 4,
    category: "frontend" as const,
  },
  {
    name: "Node.js",
    icon: "Database",
    description: "Scalable backend services and APIs",
    proficiency: 85,
    yearsOfExperience: 3,
    category: "backend" as const,
  },
  {
    name: "Docker",
    icon: "Cloud",
    description: "Containerization and deployment",
    proficiency: 80,
    yearsOfExperience: 2,
    category: "devops" as const,
  },
  {
    name: "Game Development",
    icon: "Gamepad2",
    description: "Unity and Unreal Engine expertise",
    proficiency: 75,
    yearsOfExperience: 2,
    category: "gaming" as const,
  },
  {
    name: "Python",
    icon: "Terminal",
    description: "Scripting, automation, ML and backend development",
    proficiency: 90,
    yearsOfExperience: 4,
    category: "backend" as const,
  },
  {
    name: "C / C++ / C#",
    icon: "Cpu",
    description: "Systems programming, game dev and .NET applications",
    proficiency: 78,
    yearsOfExperience: 3,
    category: "systems" as const,
  },
];

// ─── Skill Matrix ─────────────────────────────────────────────────────────────

export const SKILLS = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "Vue", "HTML/CSS"],
  backend: [
    "Node.js",
    "Express",
    "Python",
    "FastAPI",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
  ],
  systems: ["C", "C++", "C#", ".NET", "Unity", "Unreal Engine", "OpenGL", "CMake"],
  python: [
    "NumPy",
    "Pandas",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Matplotlib",
    "Flask",
    "Jupyter",
  ],
  javascript: ["ES2024+", "TypeScript", "Node.js", "Bun", "Webpack", "Vite", "Jest", "Playwright"],
  devops: ["Docker", "AWS", "CI/CD", "Nginx", "Linux", "Git"],
  tools: ["VS Code", "Figma", "Postman", "Jira", "Slack", "Discord"],
} as const;

// ─── Gaming — games list ─────────────────────────────────────────────────────

export const GAMES = [
  // ── Competitive ────────────────────────────────────────────────────────────
  {
    title: "Apex Legends",
    platform: "steam" as const,
    hoursPlayed: 280,
    achievements: 18,
    totalAchievements: 30,
    genre: "Battle Royale",
    category: "competitive" as const,
  },
  {
    title: "League of Legends",
    platform: "pc" as const,
    hoursPlayed: 4000,
    achievements: 0,
    totalAchievements: 0,
    genre: "MOBA",
    category: "competitive" as const,
    favorite: true,
  },
  {
    title: "Overwatch 2",
    platform: "pc" as const,
    hoursPlayed: 150,
    achievements: 10,
    totalAchievements: 25,
    genre: "Hero Shooter",
    category: "competitive" as const,
  },
  {
    title: "Marvel Rivals",
    platform: "pc" as const,
    hoursPlayed: 90,
    achievements: 8,
    totalAchievements: 20,
    genre: "Hero Shooter",
    category: "competitive" as const,
  },
  // ── Action / RPG ────────────────────────────────────────────────────────────
  {
    title: "Elden Ring",
    platform: "steam" as const,
    hoursPlayed: 50,
    achievements: 38,
    totalAchievements: 42,
    genre: "Action RPG",
    category: "action-rpg" as const,
    favorite: true,
  },
  {
    title: "Resident Evil 4 Remake",
    platform: "steam" as const,
    hoursPlayed: 45,
    achievements: 28,
    totalAchievements: 34,
    genre: "Survival Horror",
    category: "action-rpg" as const,
  },
  {
    title: "NieR: Automata",
    platform: "steam" as const,
    hoursPlayed: 70,
    achievements: 40,
    totalAchievements: 44,
    genre: "Action RPG",
    category: "action-rpg" as const,
    favorite: true,
  },
  // ── Indie ───────────────────────────────────────────────────────────────────
  {
    title: "Hollow Knight",
    platform: "steam" as const,
    hoursPlayed: 55,
    achievements: 32,
    totalAchievements: 40,
    genre: "Metroidvania",
    category: "indie" as const,
    favorite: true,
  },
  {
    title: "Hades",
    platform: "steam" as const,
    hoursPlayed: 80,
    achievements: 45,
    totalAchievements: 49,
    genre: "Roguelike",
    category: "indie" as const,
  },
  {
    title: "Celeste",
    platform: "steam" as const,
    hoursPlayed: 22,
    achievements: 20,
    totalAchievements: 25,
    genre: "Platformer",
    category: "indie" as const,
  },
  {
    title: "Hollow Knight: Silksong",
    platform: "steam" as const,
    hoursPlayed: 0,
    achievements: 0,
    totalAchievements: 0,
    genre: "Metroidvania",
    category: "indie" as const,
    anticipated: true,
  },
  // ── Casual / Party ──────────────────────────────────────────────────────────
  {
    title: "Among Us",
    platform: "pc" as const,
    hoursPlayed: 40,
    achievements: 10,
    totalAchievements: 15,
    genre: "Party",
    category: "casual" as const,
  },
  {
    title: "Pokémon",
    platform: "pc" as const, // emulated / various
    hoursPlayed: 200,
    achievements: 0,
    totalAchievements: 0,
    genre: "RPG",
    category: "casual" as const,
  },
] as const;

export const GAME_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "competitive", label: "Competitive" },
  { id: "action-rpg", label: "Action RPG" },
  { id: "indie", label: "Indie" },
  { id: "casual", label: "Casual" },
] as const;

// ─── Gaming — achievements ────────────────────────────────────────────────────

export const GAMING_ACHIEVEMENTS = [
  {
    title: "Completionist",
    description: "100% completion on 5+ games",
    rarity: "legendary" as const,
    unlocked: true,
    date: "2024-02-20",
  },
  {
    title: "Speed Demon",
    description: "Complete a game in under 10 hours",
    rarity: "epic" as const,
    unlocked: true,
    date: "2024-01-15",
  },
  {
    title: "Diamond Grind",
    description: "Reach Diamond rank in a competitive title",
    rarity: "epic" as const,
    unlocked: true,
    date: "2023-11-08",
  },
  {
    title: "Void Walker",
    description: "Beat all Hollow Knight bosses",
    rarity: "rare" as const,
    unlocked: true,
    date: "2024-03-05",
  },
  {
    title: "Deathless",
    description: "Clear a full roguelike run without dying",
    rarity: "rare" as const,
    unlocked: false,
  },
  {
    title: "Sharp Shooter",
    description: "Achieve 50%+ headshot accuracy over 100 matches",
    rarity: "rare" as const,
    unlocked: false,
  },
] as const;

// ─── Homepage stats ──────────────────────────────────────────────────────────

export const HOME_STATS = [
  { value: "28+", label: "Repositories", color: "text-portfolio-neon-green" },
  { value: "5+", label: "Years XP", color: "text-portfolio-neon-pink" },
  { value: "6+", label: "Tech Stacks", color: "text-portfolio-neon-blue" },
  { value: "1000+", label: "Hours Gaming", color: "text-portfolio-neon-green" },
] as const;

// ─── Social links ─────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = [
  { platform: "github", url: "https://github.com/kiyotone" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/kirtan-kunwar/" },
  { platform: "twitter", url: "https://twitter.com/kiyo_tone" },
  { platform: "steam", url: "https://steamcommunity.com/profiles/76561199256637392/" },
] as const;

// ─── Featured skills for homepage ────────────────────────────────────────────

export const FEATURED_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "C++",
  "C#",
  "OpenGL",
  "Docker",
  "Linux",
  "Git",
] as const;

// ─── Chip colour mappin g (one colour per category row) ───────────────────────

export const CATEGORY_COLORS: Record<keyof typeof SKILLS, "blue" | "green" | "pink" | "purple"> = {
  frontend: "blue",
  backend: "green",
  systems: "pink",
  python: "purple",
  javascript: "blue",
  devops: "green",
  tools: "pink",
};
