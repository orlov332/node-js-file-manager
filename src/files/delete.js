import fsPromises from 'fs/promises';

export const remove = async (file) => {
  return fsPromises.rm(file).catch((err) => {
    if (err.code === 'ENOENT') throw new Error('FS operation failed');
    else throw err;
  });
};
