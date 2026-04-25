import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['sanity', '@sanity/vision', 'styled-components'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
