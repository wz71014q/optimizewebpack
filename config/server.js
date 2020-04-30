module.exports = {
  host: 'localhost',
  port: '3000',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  },
  historyApiFallback: true,
  inline: true, // 实时刷新
  clientLogLevel: 'none',
  compress: true, // 一切服务都启用 gzip 压缩
  hot: true, // 启用 webpack 的模块热替换特性
  hotOnly: true,
  noInfo: true, // 不显示打包压缩的信息
  index: 'index.html', // 模版页
  progress: true, // 运行进度
  open: false, // 是否自动打开浏览器
  lazy: false,
  filename: '[name].[hash:8].js',
  useLocalIp: true,
  stats: 'errors-only'
};