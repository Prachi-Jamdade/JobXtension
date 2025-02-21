// /** @type {import('next').NextConfig} */



/**
 * @type {import('next').NextConfig}
 */
// const nextConfig = {
//   output: "export",
//   experimental: {
//     outputStandalone: true, // If you're using Next.js 13+
//   },
// };

// export default nextConfig;


// const nextConfig = {
//   output: 'export',

//   // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
//   // trailingSlash: true,

//   // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
//   // skipTrailingSlashRedirect: true,

//   // Optional: Change the output directory `out` -> `dist`
//   // distDir: 'dist',
// }

// export default nextConfig
export const experimental = {
  serverActions: {
    allowedOrigins: ["localhost:3000"],
     outputStandalone: true,
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


// const nextConfig = {
//   output: "export",

// };

// export default nextConfig;