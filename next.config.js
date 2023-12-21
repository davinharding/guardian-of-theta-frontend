const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([[withImages], [withBundleAnalyzer]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  images: {
    domains: ["arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM"],
  },
});
