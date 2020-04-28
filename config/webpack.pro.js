const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const webpack = require('webpack');
const WebpackChain = require('webpack-chain');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackChainConfig = new WebpackChain();
const smp = new SpeedMeasurePlugin();

webpackChainConfig
  .context(path.resolve(__dirname, '../'))
  .mode('production')

if (process.env.NODE_ENV === 'analyze') {
  webpackChainConfig
    .plugin('BundleAnalyzerPlugin')
    .use(BundleAnalyzerPlugin, [{
      analyzerPort: 8900
    }])
}

webpackChainConfig
  .optimization
  .minimizer('mock')
  .use(UglifyJsPlugin, [{
    exclude: /\.min\.js$/, // 排除项
    cache: true,
    parallel: true, // 开启并行压缩，充分利用cpu
    sourceMap: false,
    extractComments: false, // 移除注释
    uglifyOptions: {
      compress: {
        unused: true,
        warnings: false,
        drop_debugger: true
      },
      output: {
        comments: false // 移除注释
      }
    }
  }])
  .end()

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
const proConfig = smp.wrap(webpackMerge(webpackChainConfig.toConfig(), common));

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

