import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["preview-chat-6fe68600-d2e5-47ed-b851-251de67b0bff.space-z.ai", "*.space-z.ai"],
};

export default nextConfig;
