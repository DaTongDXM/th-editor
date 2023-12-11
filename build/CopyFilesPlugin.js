/**
 * @description: 文件拷贝插件
 * @return {*}
 */
const fs = require('fs-extra');
const path = require('path');

class CopyFilesPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('CopyFilesPlugin', (compilation, callback) => {
      const { from, to } = this.options;
      // 从from目录拷贝文件至to目录
      this.copyFolderRecursive(from, to);
      callback();
    });
  }

  copyFolderRecursive(source, target) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }

    fs.readdirSync(source).forEach((file) => {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);

      if (fs.lstatSync(sourcePath).isDirectory()) {
        this.copyFolderRecursive(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
  }
}

module.exports = CopyFilesPlugin;
