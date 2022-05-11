const {
  loadConfigFromFile,
  mergeConfig
} = require("vite");

const eslintPlugin = require("vite-plugin-eslint").default;

const path = require("path");

const cesium = require('vite-plugin-cesium').default;

module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials"],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },

  async viteFinal(previousConfig) {
    const {
      config
    } = await loadConfigFromFile(path.resolve(__dirname, "../vite.config.ts"));
    previousConfig.resolve.alias['@'] = path.resolve(__dirname, '..', 'src');
    return mergeConfig(previousConfig, { ...config,
      plugins: [eslintPlugin(), cesium()]
    });
  }

};