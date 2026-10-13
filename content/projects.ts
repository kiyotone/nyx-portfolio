export type Project = {
  key: string; kind: string; name: string; blurb: string;
  stack: readonly string[]; href?: string; status?: string;
};

/* Naming discipline, and it must not blur: nyxty is the runtime, Nyxel is an
   application that runs on it, NyxVoxLab is the benchmark repository. */
export const projects: readonly Project[] = [
  {
    key: 'nyxty', kind: 'Runtime', name: 'nyxty-engine',
    blurb:
      'A modular C++20 application runtime. Features load as separate module DLLs and hot-swap at runtime without restarting the host. Three arena allocators, generational handles so a stale reference fails safely, an event bus on entt::delegate that keeps dispatch off the heap, and a worker pool returning std::future.',
    stack: ['C++20', 'CMake', 'EnTT', 'spdlog'],
    href: 'https://github.com/kiyotone/nyxty-engine',
  },
  {
    key: 'nyxel', kind: 'Application', name: 'Nyxel',
    blurb:
      'A voxel raycast renderer built on nyxty. Sparse voxel octrees, DDA traversal, and a per-voxel-face irradiance cache for global illumination. Chunk-blocked storage with per-chunk worldgen and residency.',
    stack: ['C++20', 'bgfx', 'HLSL'],
  },
  {
    key: 'nyxvoxlab', kind: 'Research', name: 'NyxVoxLab',
    blurb:
      'A benchmark engine where voxel storage (dense texture, SVO, SVDAG) and render technique (DDA, path tracing, GI) are separate pluggable pieces, so any combination can be measured against any other. GPU traversal is fuzz-tested against a CPU reference; quality is measured against Mitsuba 3 ground truth.',
    stack: ['C++20', 'bgfx', 'GLSL', 'Python'],
    href: 'https://github.com/kiyotone/NyxVoxLab',
  },
  {
    key: 'dspt', kind: 'In progress', name: 'Differentiable Spectral Path Tracer',
    blurb:
      'Physics-based inverse rendering with neural sampling. Extending Mitsuba in C++ with neural spectral sampling modules and gradient caching, plus a neural importance sampler for Monte Carlo estimation in spectral differentiable light transport.',
    stack: ['C++', 'CUDA', 'Mitsuba'],
    status: 'Ongoing',
  },
  {
    key: 'devtrace', kind: 'Tool', name: 'DevTrace',
    blurb:
      'A session-based developer journal CLI. Every existing tool works backwards from commits; this works forwards from intent. Session chains with intent inheritance, a core library kept separate from the CLI, JSON as the single source of truth. I use it to log my own sessions.',
    stack: ['C++17', 'CMake', 'ctest'],
    href: 'https://github.com/kiyotone/DevTrace',
  },
  {
    key: 'algoviz', kind: 'Small', name: 'Algorithm Visualizer',
    blurb:
      'Breadth-first search animated across a 40×40 grid — a queue for the frontier, a parent matrix to walk the shortest path back. Delta-time driven, obstacles placed with the mouse.',
    stack: ['C++', 'SFML', 'Make'],
    href: 'https://github.com/kiyotone/AlgorithmVisualizer',
  },
];
