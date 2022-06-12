import fsPromises from 'fs/promises';
import crypto from 'crypto';

export const calculateHash = async (file) => {
  return fsPromises
      .readFile(file)
      .then((content) =>
        crypto.createHash('sha256').update(content).digest('hex'),
      );
};
