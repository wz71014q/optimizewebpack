const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const portfinder = require('portfinder');
const webpackConfig = require('./webpack.dev');
const devServer = require('./server');
const ip = require('ip').address();

portfinder.basePort = 3000;    // default: 8000
portfinder.highestPort = 3333; // default: 65535

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, devServer);
const server = new WebpackDevServer(compiler, devServerOptions);

portfinder.getPortPromise()
  .then((port) => {
    server.listen(port, ip, () => {
      console.log(`\nStarting server on http://${ip}:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });