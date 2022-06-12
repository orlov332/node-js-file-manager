import {parseArgs} from './args.js';
import * as readline from 'node:readline';
import {stdin as input, stdout as output, argv} from 'node:process';
import path from 'path';
import {list} from './list.js';
import {read} from './read.js';
import {create} from './create.js';
import {rename} from './rename.js';
import {copy} from './copy.js';
import {remove} from './delete.js';

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
        await read(first).then(console.log);
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
      default:
        console.log(`Invalid input: ${input}`);
    }
  } catch (err) {
    console.log('Operation failed');
  }
  showCwd();
}

