import fs from 'fs';
import {pipeline} from 'stream/promises';
import zlib from 'zlib';


export const compress = async (pathToFile, pathToDestination) => {
  return pipeline(
      fs.createReadStream(pathToFile),
      zlib.createGzip(),
      fs.createWriteStream(pathToDestination),
  );
};
