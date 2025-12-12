/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line: output: 'standalone',
  images: {
    domains: ['res.cloudinary.com'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig