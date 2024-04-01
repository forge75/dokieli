const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WatchFilesPlugin = require('webpack-watch-files-plugin').default;

module.exports = (env) => {
  return {
    mode: 'development',
    // target: 'web',
    resolve: {
      modules: ["node_modules", "src/", "derene/"],
      fallback: {
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        url: false,
        "https-browserify": false,
        stream: false,
        "stream-browserify": false,
        crypto: false,
        buffer: require.resolve("buffer/"),
        os: false
      },
      extensions: [".ts", ".js", ".mjs"],
    },
    entry: ["./src/dokieli.js"],
    output: {
      path: path.join(__dirname, "/scripts/"),
      filename: "dokieli.js",
      library: undefined, 
      libraryExport: 'default', 
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [ 
            "/src/__tests__/",
            "/node_modules/",
            "/__testUtils__/",
            "/derene/__tests__/"
          ],
        },
      ],
    },
    externals: {
      "text-encoding": "TextEncoder",
      "whatwg-url": "window",
      "isomorphic-fetch": "fetch",
      "@trust/webcrypto": "crypto",
    },
    devServer:{
      client: {
        overlay: true,
      },
      compress: false,
      hot: false,
      liveReload: false,
      port: 'auto',
      static:[
        {
          directory: path.join(__dirname, ),      
          publicPath: '/derene'
        },
        {
          directory: path.join(__dirname, 'assets'),      
          publicPath: '/derene'
        },
        {
          directory: path.join(__dirname, '../'),      
          publicPath: '/derene'
        },
        {
          directory: path.join(__dirname, '../'),      
          publicPath: '/'
        },   
      ],
      webSocketServer: 'ws'
    },
    devtool: "source-map",
    performance: {
      hints: false,
    },
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      nodeEnv: 'development'
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        MediumEditor: "medium-editor", 
        MediumEditorTable: "medium-editor-tables"
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new BundleAnalyzerPlugin({ analyzerMode: 'disabled' }),
      new WatchFilesPlugin({
          files: ['./**/*.*']
        })
    ],
  };
};


