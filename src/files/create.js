import {pipeline} from 'stream/promises';
import fs from 'fs';
import {Readable} from 'stream';

export const create = async (file) => {
  return pipeline(
      Readable.from(''),
      fs.createWriteStream(file),
  );
};
