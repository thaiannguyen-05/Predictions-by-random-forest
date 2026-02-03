

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/upload/**',
      },
    ],
  },
  
  async rewrites() {
    return [
      {
        
        source: '/auth/:path*',
        
        destination: 'http://localhost:4000/auth/:path*',
      },
      {
        
        source: '/user/:path*',
        
        destination: 'http://localhost:4000/user/:path*',
      },
      
      
      
      
      
    ];
  },
};

module.exports = nextConfig;