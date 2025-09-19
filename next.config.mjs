/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { serverActions: { allowedOrigins: ['*'] } },
  headers: async () => [
    { source: '/(.*)', headers: [
      { key:'X-Frame-Options', value:'DENY' },
      { key:'X-Content-Type-Options', value:'nosniff' },
      { key:'Referrer-Policy', value:'strict-origin-when-cross-origin' },
      { key:'Permissions-Policy', value:'geolocation=(self), microphone=(self)' },
    ]},
    { source: '/api/:path*', headers: [ { key:'Cache-Control', value:'no-store' } ] },
  ],
};
export default nextConfig;
