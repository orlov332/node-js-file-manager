export const parseArgs = (args) => {
  return args.reduce((res, ar) => {
    const [name, value] = ar.replace(/^--/, '').split('=');
    res[name.replace('--', '')] = value;
    return res;
  }, {});
};

