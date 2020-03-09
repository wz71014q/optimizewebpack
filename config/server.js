module.exports = {
  contentBase: '/dist', // 本地服务器所加载的页面所在的目录
  host: 'localhost',
  port: '3000',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  },
  historyApiFallback: true, // 不跳转
  inline: true, // 实时刷新
  clientLogLevel: 'none',
  compress: true, // 一切服务都启用 gzip 压缩
  hot: true, // 启用 webpack 的模块热替换特性
  hotOnly: true,
  noInfo: true, // 不显示打包压缩的信息
  index: '/index.html', // 模版页
  progress: true, // 运行进度
  watchContentBase: true, // 观察 devServer.contentBase 下的文件。文件修改后，会触发一次完整的页面重载
  open: false, // 是否自动打开浏览器
  lazy: false,
  filename: '[name].[hash:8].js',
  useLocalIp: true,
  stats: 'errors-only'
};