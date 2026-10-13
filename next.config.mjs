/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* the dev badge sits on the camcorder's date in the bottom-left corner */
  devIndicators: false,

  /* Traces the minimal set of node_modules the server actually needs and emits
     a self-contained .next/standalone. Without it the runtime image has to
     carry the whole dependency tree — roughly 400MB instead of ~180MB. */
  output: 'standalone',
};

export default nextConfig;
