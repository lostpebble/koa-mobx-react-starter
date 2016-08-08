function imageRequire(pathToImage) {
  if (process.env.BABEL_ENV === 'client-dev' || process.env.BABEL_ENV === 'client-build') {
    return require(`${__dirname}/../../src/images/${pathToImage}`);
  } else {
    return `/dist/images/${pathToImage}`;
  }
}

export { imageRequire };
