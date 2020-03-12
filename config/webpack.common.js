const path = require('path');
const WebpackChain = require('webpack-chain');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const webpackChainConfig = new WebpackChain();

webpackChainConfig
  .entry('main')
    .add(path.resolve(__dirname, '../main.js'))
    .end()
  .output
    .path(path.resolve(__dirname, '../dist'))
    .filename('[name].[hash:8].js')
    .publicPath('./')

webpackChainConfig.resolve
  .extensions
    .merge(['.js', '.jsx', '.vue', '.json'])
    .end()
  .modules
    .add('node_modules')
    .end()
  .alias
    .set('@', path.resolve(__dirname, '../src'))
    .set('vue$', 'vue/dist/vue.esm.js')

webpackChainConfig.module
  .rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
      .loader('vue-loader')

webpackChainConfig.module
.rule('images')
  .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 10000,
      name: "[name].[hash:7].[ext]",
      publicPath: "./images/",
      outputPath: "images/"
    })

webpackChainConfig.module
  .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
      .loader('file-loader')
      .options({
        limit: 10000,
        name: "[name].[hash:7].[ext]",
        publicPath: "./images/",
        outputPath: "images/"
      })

webpackChainConfig.module
  .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: '[name].[hash:7].[ext]',
        publicPath: "./media/",
        outputPath: "media/"
      })

webpackChainConfig.module
  .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: '[name].[hash:7].[ext]',
        publicPath: "./fonts/",
        outputPath: "fonts/"
      })

webpackChainConfig
  .plugin('HtmlWebpackPlugin')
  .use(HtmlWebpackPlugin, [{
    template: path.resolve(__dirname,'../index.html')// template
  }])

webpackChainConfig
  .plugin('VueLoaderPlugin')
  .use(VueLoaderPlugin, [{
    log: false
  }])

module.exports = webpackChainConfig.toConfig();

