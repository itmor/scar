//Polyfill Node.js core modules in Webpack. This module is only needed for webpack 5+.
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  module: {
    rules: [
      // {
      //   test: /\.ts?$/,
      //   include: path.resolve(__dirname, 'src'),
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         transpileOnly: true,
      //         experimentalWatchApi: true,
      //       },
      //     },
      //   ],
      // },
      { test: /\.node$/, use: 'node-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', 'scss'],
    fallback: {
      fs: false,
      readline: false,
      child_process: false,
      net: false,
      tls: false,
    },
  },
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    }),
  ],
};
