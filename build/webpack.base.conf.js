const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  root: path.join(__dirname, "../"),
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/",
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `./${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "url-loader?name=./assets/fonts/[name].[ext]",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true, config: { path: `${PATHS.root}postcss.config.js` } },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true, config: { path: `${PATHS.root}postcss.config.js` } },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {},
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `./${PATHS.assets}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "./index.html",
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: "" },
      { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
    ]),
  ],
};
