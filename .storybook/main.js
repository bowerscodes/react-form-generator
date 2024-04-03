import { join, dirname } from "path";

const path = require("path");

const PnpWebpackPlugin = require("pnp-webpack-plugin");

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: './storybook/tsconfig.json'
    },
  },
  webpackFinal: async function(config, { configType }) {
    // Make webpack use the real path of the symlinked packages
    config.resolve.symlinks = false;

    // Make sure config.resolve and config.resolveLoader are defined
    config.resolve = config.resolve || {};
    config.resolveLoader = config.resolveLoader || {};

    // Make Webpack use Yarn PnP (instead of node_modules)
    config.resolve.plugins = [PnpWebpackPlugin];
    config.resolveLoader.plugins = [PnpWebpackPlugin.moduleLoader(module)];

    // Add alias for react-component-library
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-component-library": getAbsolutePath("react-component-library"),
    };

    // Handle SCSS files
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', 
        'css-loader', 
        'sass-loader'
      ],
    });

    // Rule for TypeScript files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    });
    // Add TypesCript extensions
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};
export default config;
