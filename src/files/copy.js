import {pipeline} from 'stream/promises';
import fs from 'fs';

export const copy = async (srcPath, dstPath) => {
  return pipeline(
      fs.createReadStream(srcPath),
      fs.createWriteStream(dstPath),
  );
};
