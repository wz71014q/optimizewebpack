const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const webpack = require('webpack');
const WebpackChain = require('webpack-chain');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');

const webpackChainConfig = new WebpackChain();

webpackChainConfig
  .context(path.resolve(__dirname, '../'))
  .mode('production')

webpackChainConfig.module
  .rule('css')
    .test(/\.(sa|sc|c)ss$/)
    .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
    .use('style-loader')
      .loader('style-loader')
      .end()
    .use('css-loader')
      .loader('css-loader')
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        config: {
          path: './'
        }
      })
      .end()
    .use('sass-loader')
      .loader('postcss-loader')
      .end()
const proConfig = webpackMerge(webpackChainConfig.toConfig(), common);

if (fs.existsSync(path.resolve(__dirname, '../dist'))) {
  rimraf.sync(path.resolve(__dirname, '../dist'))
}

webpack(proConfig, (err, stas) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success')
  }
})

module.exports = proConfig;

