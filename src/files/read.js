import fsPromises from 'fs/promises';


export const read = async (file) => {
  return fsPromises
      .readFile(file, 'utf8')
      .catch((err) => {
        if (err.code === 'ENOENT') throw new Error('FS operation failed');
        else throw err;
      });
};
