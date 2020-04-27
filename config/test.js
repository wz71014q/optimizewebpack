
function getEntry() {
  const entry = {};
  //读取src目录所有page入口
  glob.sync('../src/views/*/*/index.js')
      .forEach(function (filePath) {
          var name = filePath.match(/\/pages\/(.+)\/index.js/);
          name = name[1];
          entry[name] = filePath;
      });
  return entry;
};