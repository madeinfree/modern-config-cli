const fs = require('fs');
const { isString } = require('./isTypes');

const checkFolderExists = path =>
  new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      if (exists) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });

const createFolder = path => {
  if (!isString(path))
    throw new Error(`Folder name expect string but got ${typeof path}`);
  return new Promise((resolve, reject) => {
    checkFolderExists(path)
      .then(exists => {
        resolve(false);
      })
      .catch(notExists => {
        fs.mkdir(path, () => {
          resolve(true);
        });
      });
  });
};

module.exports = {
  createFolder
};
