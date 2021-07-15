const path = require("path");

module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
    "@next/plugin-storybook",
    "storybook-css-modules-preset",
    "storybook-addon-designs"
  ],
  webpackFinal: async (config) => {
    const nextConfig = require('../next.config');
    // merge whatever from nextConfig into the webpack config storybook will use
    return { ...config };
  },
}