import {parseArgs} from './args.js';
import * as readline from 'node:readline';
import {stdin as input, stdout as output, argv} from 'node:process';
import path from 'path';
import {list} from './list.js';

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
      default:
        console.log(`Invalid input: ${input}`);
    }
  } catch (err) {
    console.log('Operation failed');
  }
  showCwd();
}

