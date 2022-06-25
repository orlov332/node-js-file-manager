import os from 'os';

export const processOsCommand = async (command) => {
  switch (command) {
    case '--EOL':
      console.log(os.EOL
          .replace('\u000A', 'LF')
          .replace('\u000D', 'CR'));
      break;
    case '--cpus':
      console.log(`CPU amount ${os.cpus().length}`);
      os.cpus()
          .map((cpu) => `Model ${cpu.model}, rate ${cpu.speed/1000}GHz`)
          .forEach((cpu) => console.log(cpu));
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
  }
};
