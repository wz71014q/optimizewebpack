const path = require('path');
const WebpackChain = require('webpack-chain');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const logConfig = require('./logConfig.js');
const entries = require('./entry.js');

const entryArray = Object.keys(entries);
const webpackChainConfig = new WebpackChain();

(function getEntry() {
  let templateName = 'index';
  let chunkName = 'main';
  entryArray.forEach(item => {
    if (/\./.test(item)) {
      chunkName = 'main';
      templateName = 'index';
    } else {
      templateName = item;
      chunkName = item;
    }
    webpackChainConfig.entry(chunkName).merge([entries[item]]);
    webpackChainConfig
    .plugin(`html-${item}`)
    .use(HtmlWebpackPlugin, [{
      filename: `../${templateName}.html`,
      chunks: [chunkName, 'vendor', 'vue', 'mock'],
      template: path.resolve(__dirname,'../public/index.html')// template
    }])
  })
}())

webpackChainConfig
  .stats(logConfig)
  .output
    .path(path.resolve(__dirname, '../dist/js'))
    .filename(`${process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js'}`)
    .publicPath('./js/')
    .end()

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
    .set('mockDataPath', path.resolve(__dirname, '../src/mock/mock.js'))

webpackChainConfig.module
  .rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
      .loader('vue-loader')

webpackChainConfig.module
.rule('js')
  .test(/(\.jsx|\.js)$/)
  .use('babel-loader')
    .loader('babel-loader')

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
  .plugin('DefinePlugin')
  .use(webpack.DefinePlugin, [{
    ISDEBUG: process.env.NODE_ENV !== 'production'
  }])

webpackChainConfig
  .plugin('VueLoaderPlugin')
  .use(VueLoaderPlugin, [{
    log: false
  }])

webpackChainConfig.optimization
  .splitChunks({
    chunks: 'all',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vue: {
        test: /vue/,
        chunks: "initial",
        name: "vue",
        priority: 1, // 优先级
        enforce: true
      },
      vendor: {
        test: /node_modules/,
        name: "vendor",
        chunks: "initial",
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0
      },
      mock: {
        test: /mock/,
        name: "mock",
        chunks: "initial",
        minChunks: 2,
        maxInitialRequests: 5,
        priority: 5, // 优先级
        minSize: 0
      }
    }
  })
  .end()

module.exports = webpackChainConfig.toConfig();

