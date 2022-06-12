import fs from 'fs';


export const read = async (file) => {
  const str = fs.createReadStream(file, 'utf8');
  for await (const chunk of str) {
    console.log(chunk);
  }
};
