const path = require('path');
const WebpackChain = require('webpack-chain');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common')

const webpackChainConfig = new WebpackChain();

webpackChainConfig
  .context(path.resolve(__dirname, '../'))
  .mode('development')
  .devtool('inline-source-map')

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
      // .options({
      //   modules: {
      //     mode: 'local',
      //     localIdentName: '[path][name]__[local]',
      //     sourceMap: true
      //   }
      // })
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

const devConfig = webpackMerge(webpackChainConfig.toConfig(), common);

module.exports = devConfig;

