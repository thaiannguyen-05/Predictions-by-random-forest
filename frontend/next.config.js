// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
    ],
  },
  // Bắt buộc để Next.js không cố gắng tìm các trang này
  async rewrites() {
    return [
      {
        // Đường dẫn đi vào: Mọi yêu cầu bắt đầu bằng /auth/
        source: '/auth/:path*',
        // Đường dẫn đến: Chuyển hướng đến Backend NestJS đang chạy ở cổng 4000
        destination: 'http://localhost:4000/auth/:path*',
      },
      // Bạn có thể thêm các API route khác nếu cần
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost:4000/api/:path*',
      // },
    ];
  },
};

module.exports = nextConfig;