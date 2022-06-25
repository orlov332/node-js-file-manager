import fs from 'fs';
import {pipeline} from 'stream/promises';
import zlib from 'zlib';

export const decompress = async (pathToFile, pathToDestination) => {
  return pipeline(
      fs.createReadStream(pathToFile),
      zlib.createGunzip(),
      fs.createWriteStream(pathToDestination),
  );
};
