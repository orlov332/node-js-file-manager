import {parseArgs} from './args.js';
import * as readline from 'node:readline';
import {stdin as input, stdout as output, argv} from 'node:process';
import path from 'path';
import {list} from './files/list.js';
import {read} from './files/read.js';
import {create} from './files/create.js';
import {rename} from './files/rename.js';
import {copy} from './files/copy.js';
import {remove} from './files/delete.js';
import {processOsCommand} from './os.js';
import {calculateHash} from './calcHash.js';
import {compress} from './zip/compress.js';
import {decompress} from './zip/decompress.js';

// get username
const {username} = parseArgs(argv.slice(2));
console.log(`Welcome to the File Manager, ${username}!`);

const showCwd = () => {
  console.log(`You are currently in ${process.cwd()}`);
};


const rl = readline.createInterface({input, output});
// rl.setPrompt('>');

const exitApp = () => {
  console.log('Thank you for using File Manager, Username!');
  rl.close();
};

rl.on('SIGINT', () => {
  exitApp();
});

const homeDir = process.env.HOME || process.env.USERPROFILE;
process.chdir(homeDir);
showCwd();

for await (const input of rl) {
  const [command, first, second] = input.split(' ');
  try {
    switch (command) {
      case '.exit':
        exitApp();
        break;
      case 'ls':
        await list(process.cwd()).then((files) =>
          files.forEach((file) => console.log(file)));
        break;
      case 'cd':
        process.chdir(path.join(process.cwd(), first));
        break;
      case 'up':
        if (homeDir !== process.cwd()) {
          process.chdir(path.join(process.cwd(), '..'));
        }
        break;
      case 'cat':
        await read(first);
        break;
      case 'add':
        await create(first);
        break;
      case 'rn':
        await rename(first, second);
        break;
      case 'cp':
        await copy(first, second);
        break;
      case 'mv':
        await copy(first, second).then(() => remove(first));
        break;
      case 'rm':
        await remove(first);
        break;
      case 'os':
        await processOsCommand(first);
        break;
      case 'hash':
        await calculateHash(first).then(console.log);
        break;
      case 'compress':
        await compress(first, second);
        break;
      case 'decompress':
        await decompress(first, second);
        break;
      default:
        console.log(`Invalid input: ${input}`);
    }
  } catch (err) {
    console.log('Operation failed');
  }
  showCwd();
}

