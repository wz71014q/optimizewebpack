const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackChain = require('webpack-chain');
const webpackMerge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const ip = require('ip').address();
const devServer = require('./server');
const common = require('./webpack.common')

const webpackChainConfig = new WebpackChain();

portfinder.basePort = 3000;
portfinder.highestPort = 3333;

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
webpackChainConfig
  .plugin('ProvidePlugin')
  .use(webpack.ProvidePlugin, [{
    'mockData': 'mockDataPath'
  }])
portfinder.getPortPromise()
  .then((port) => {
    webpackChainConfig
      .plugin('FriendlyErrorsPlugin')
      .use(FriendlyErrorsPlugin, [{
        compilationSuccessInfo: {
          messages: [`You application is running here http://${ip}:${port}`]
        },
        onErrors: function (severity, errors) {
          console.log(errors)
        },
        clearConsole: true,
      }])
    const devConfig = webpackMerge(webpackChainConfig.toConfig(), common);
    const compiler = webpack(devConfig);
    const devServerOptions = Object.assign({}, devServer);
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(port, ip);
  })
  .catch((err) => {
    console.error(err);
  });

