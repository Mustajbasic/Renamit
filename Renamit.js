const path = require('path');
const fs = require('fs');
const Talker = require('./Talker');

const Renamit = (()=>{
    const bulkRename = (pathToFolder)=>{
        let loadedFiles = [];
        fs.readdir(pathToFolder, (err, files) => {
            const numberOfFiles = files.length;
            files.forEach(file => {
              fs.stat(path.join(pathToFolder, file), (err, stat)=>{
                  let createdAt = new Date(stat.birthtime);
                  loadedFiles.push({
                      pathToFolder: pathToFolder,
                      fileName: file,
                      createdAtMs: createdAt.getTime()
                  });
                  if(loadedFiles.length === numberOfFiles) {
                      renameFiles(loadedFiles);
                  }
              });
            });
          });
    };

    const renameFiles = (files)=>{
        let i = 1;
        files.sort((fA,fB)=>{
            return fA.createdAtMs > fB.createdAtMs;
        });
        Talker.getFileTemplate((prefix)=>{
            renameResursively(files, i, prefix);
        })
        

    };

    const renameResursively = (files, i, prefix) => {
        if(files.length === 0) return;
        let file = files.shift();
        let fileArr = file.fileName.split('.');
        fs.rename(path.join(file.pathToFolder,file.fileName),path.join(file.pathToFolder, prefix + ' ' + i + '.' + fileArr[1]),()=>{
            i++;
            renameResursively(files,i, prefix);
        })
    };
    return bulkRename;
})();

module.exports = Renamit;