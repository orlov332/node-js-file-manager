import fsPromises from 'fs/promises';


export const rename = async (file, newFile) => {
  return fsPromises
      .stat(newFile)
      .then(() => {
        throw new Error('FS operation failed');
      })
      .catch((statErr) => {
        if (statErr.code === 'ENOENT') {
          fsPromises.rename(file, newFile).catch((err) => {
            if (err.code === 'ENOENT') throw new Error('FS operation failed');
            else throw err;
          });
        } else throw statErr;
      });
};
