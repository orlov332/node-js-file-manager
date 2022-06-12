import fsPromises from 'fs/promises';

export const create = async (file) => {
  const data = '';

  return fsPromises.writeFile(file, data, {flag: 'wx'}).catch((err) => {
    if (err.code === 'EEXIST') throw new Error('FS operation failed');
    else throw err;
  });
};
