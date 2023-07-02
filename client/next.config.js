const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,

  webpack: function (config) {
    config.experiments = { topLevelAwait: true };
    return config;
  },
});
