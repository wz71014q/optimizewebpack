const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf')

const fileDirList = fs.readdirSync(path.resolve(__dirname, '../src/views'));
const entriesDir = path.resolve(process.cwd(), './entries');
const entries = {};

function buildEntry() {
  fileDirList.forEach(item => {
    const stat = fs.statSync(path.resolve(__dirname, '../src/views', item));
    if (stat.isDirectory()) {
      entries[item] = buildEntryFile(item);
    } else {
      entries[item] = buildEntryFile(item.split('.')[0]);
    }
  })
  return entries
}

// 构建临时入口文件
function buildEntryFile(pageName) {
  const fileContent = buildFileContent(pageName)
  const entryFile = `${path.resolve(entriesDir, pageName)}.js`
  fs.writeFileSync(entryFile, fileContent)
  return entryFile
}

function buildFileContent(name) {
  const templateHome = `
  import Vue from 'vue';
  import App from '@/views/App';
  import router from '@/router'
  const $vm = new Vue({
    el: '#root',
    router,
    components: { App },
    template: '<App/>'
  });
  Vue.use($vm);
  `
  const template = `
    import Vue from 'vue';
    import App from '@/views/${name}';
    const $vm = new Vue({
      el: '#root',
      components: { App },
      template: '<App/>'
    });
    $vm.$mount('#app');
  `
  if (name === 'Home') {
    return templateHome;
  }
  return template;
}

module.exports = function() {
  if (fs.existsSync(entriesDir)) {
    rimraf.sync(entriesDir)
  }
  fs.mkdirSync(entriesDir)
  return buildEntry()
}