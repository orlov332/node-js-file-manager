import fsPromises from 'fs/promises';


export const list = async (dir) => {
  return fsPromises
      .readdir(dir)
      .catch((err) => {
        if (err.code === 'ENOENT') throw new Error('FS operation failed');
        else throw err;
      });
};
