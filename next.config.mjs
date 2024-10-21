/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/protected/:path*",
        has: [
          {
            type: "cookie",
            key: "auth-token",
            value: "(?<authToken>)",
          },
        ],
        permanent: false,
        destination: "/login",
      },
    ];
  },
};

export default nextConfig;
