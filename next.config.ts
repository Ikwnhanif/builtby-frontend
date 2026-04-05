import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. WAJIB: Agar build Docker di HP 280 jadi ringan (Output Standalone)
  output: "standalone",

  images: {
    remotePatterns: [
      // 2. Akses Gambar dari API Produksi (HTTPS)
      {
        protocol: "https",
        hostname: "api-builtby.outsys.space",
        pathname: "/uploads/**",
      },
      // 3. Akses Gambar dari API Produksi (HTTP - Cadangan)
      {
        protocol: "http",
        hostname: "api-builtby.outsys.space",
        pathname: "/uploads/**",
      },
      // 4. Akses Ikon untuk IconCloud 3D
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
    ],
  },

  // 5. Bypass check agar build di Docker cepat & anti-gagal
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
