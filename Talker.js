const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const Talker = (()=>{
    const getFilePath = (cb)=>{
        rl.question('Path to folder: ', (Path) => {
            cb(Path);
          });
    }

    const getFileTemplate = (cb)=>{
        rl.question('Type file prefix: ', (prefix) => {
            cb(prefix);
          });
    };

    return {
        getFilePath: getFilePath,
        getFileTemplate: getFileTemplate
    };
  })();

  module.exports = Talker;