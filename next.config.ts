/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. ADD THE REDIRECTS FUNCTION HERE
  async redirects() {
    return [
      {
        // Replace '/wrong-page-url' with the URL Google is indexing incorrectly
        source: '/page/magazine', 
        // Replace '/' with the correct URL you want to be indexed (e.g., your index page)
        destination: '/',
        // Set to true for a permanent 301 redirect (best for SEO)
        permanent: true, 
      },
    ]
  },
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