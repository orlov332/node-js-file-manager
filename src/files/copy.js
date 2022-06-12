import fsPromises from 'fs/promises';

export const copy = async (srcPath, dstPath) => {
  return fsPromises
      .cp(srcPath, dstPath, {
        force: false,
        errorOnExist: true,
        recursive: true,
      })
      .catch((err) => {
        if (err.code === 'ERR_FS_CP_EEXIST' || err.code === 'ENOENT') {
          throw new Error('FS operation failed');
        } else throw err;
      });
};
