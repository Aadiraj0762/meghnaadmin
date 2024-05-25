// const runtimeCaching = require("next-pwa/cache");
// const nextTranslate = require("next-translate");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   runtimeCaching,
//   buildExcludes: [/middleware-manifest\.json$/],
//   scope: "/",
//   sw: "service-worker.js",
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
// });

// module.exports = withPWA({
//   reactStrictMode: true,
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },

//   images: {
//     domains: [
//       "images.unsplash.com",
//       "img.icons8.com",
//       "i.ibb.co",
//       "i.postimg.cc",
//       "fakestoreapi.com",
//       "res.cloudinary.com",
//       "lh3.googleusercontent.com",
//       "res.cloudinary.com",
//       "lh3.googleusercontent.com",
//       "",
//       "images.dashter.com",
//       "assets.licious.in",
//       "example.com",
//     ],
//   },

//   ...nextTranslate(),
// });



const withTM = require("next-transpile-modules")(["@mapbox/mapbox-sdk"], { resolveSymlinks: false });
const runtimeCaching = require("next-pwa/cache");
const nextTranslate = require("next-translate");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
  scope: "/",
  sw: "service-worker.js",
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(
  withTM({
    reactStrictMode: true,
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },

    images: {
      domains: [
        "images.unsplash.com",
        "img.icons8.com",
        "i.ibb.co",
        "i.postimg.cc",
        "fakestoreapi.com",
        "res.cloudinary.com",
        "lh3.googleusercontent.com",
        "res.cloudinary.com",
        "lh3.googleusercontent.com",
        "",
        "images.dashter.com",
        "assets.licious.in",
        "example.com",
      ],
    },

    ...nextTranslate(),
  })
);
