// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   distDir: "out",
// };

// export default nextConfig;




/**
 * @type {import('next').NextConfig}
 */
export const experimental = {
  serverActions: {
    allowedOrigins: ["localhost:3000"],
  },
};
export const logging = {
  fetches: {},
};
export const images = {
  remotePatterns: [
    { hostname: "images.unsplash.com" },
    { hostname: "avatar.vercel.sh" },
    { hostname: "flag.vercel.app" },
    { hostname: "illustrations.popsy.co" },

    {
      protocol: "https",
      hostname: "media.licdn.com",
      pathname: "/dms/**",
    },
    { hostname: "via.placeholder.com" },
    { hostname: "example.com" },
    { hostname: "www.google.com" },
  ],
};
