import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from '../client/react/App';

import { createStoresFromState } from '../crossover/mobx/store-utils';

/*
 +*  This function is important for the crossover between server and client (isomorphic / universal).
 +*  It defines a single, identical starting point for ReactJS page layout on both sides.
 +* */
export function baseReact(stores) {
  return (
    <Provider { ...stores }>
      <App />
    </Provider>
  );
}

// Check to ensure the client mounting code never runs from NODE because
// we need to access this file from the server for baseReact() above and
// this code will throw an error because of the undefined document variable
if (typeof document !== 'undefined') {
  require('../client/styles/entry.scss');

  const rootEl = document.getElementById('root');

  const initialState = JSON.parse(window.__INITIAL_STATE__);
  const stores = createStoresFromState(initialState);

  // console.dir(stores);

  ReactDOM.render(
    baseReact(stores),
    rootEl
  );

  // This is required for React hot reloading, will be
  // turned off automatically for production
  if (module.hot) {
    module.hot.accept('../client/react/App', () => {
      ReactDOM.render(
        baseReact(),
        rootEl
      );
    });
  }
}
