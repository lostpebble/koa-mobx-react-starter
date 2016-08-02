// import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

const rootEl = document.getElementById('root');

import baseReact from './baseReact';

ReactDOM.render(
  baseReact(),
  rootEl
);

if (module.hot) {
  module.hot.accept('./React/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    // const NextApp = require('./React/App').default;
    ReactDOM.render(
      baseReact(),
      rootEl
    );
  });
}
