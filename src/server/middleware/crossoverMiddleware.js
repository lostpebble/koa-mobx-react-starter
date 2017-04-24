import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from '../../client/react/routes/routes';

import { baseReact } from '../../crossover/entry';
import { getFreshStores } from '../../crossover/mobx/store-utils';

const markoTemplate = require('../../../views/base.marko');

export function injectState() {
  return async(ctx, next) => {
    console.log("Injecting (MobX) state into current request/response context");

    ctx.state.mobx = getFreshStores();

    await next();
  };
}

export function renderReact() {
  return async(ctx) => {
    console.log("Rendering React with state");

    // For server rendering (building the page for the first time
    // to shoot to the user's browser as an HTML file) we must use
    // either client-build (for production) or client-dev (for including
    // react-hot-reloading) as our babel environment variable.
    // see .babelrc
    process.env.BABEL_ENV = process.env.NODE_ENV === 'production' ? 'client-build' : 'client-dev';

    match({ routes, location: ctx.path }, (err, redirect, props) => {
      if (err) {
        // there was an error somewhere during route matching
        ctx.status = 500;
        ctx.body = err.message;
      } else if (redirect) {
        // we haven't talked about `onEnter` hooks on routes, but before a
        // route is entered, it can redirect. Here we handle on the server.
        ctx.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        // if we got props then we matched a route and can render
        const html = renderToString(baseReact(ctx.state.mobx, <RouterContext {...props}/>));

        ctx.type = "text/html";
        ctx.body = markoTemplate.renderToString({
          html,
          title: "koa-mobx-react-starter",
          description: "Starter project for ReactJS, koa and the awesome MobX state management library.",
          initialState: JSON.stringify(ctx.state.mobx),
        });
      } else {
        // no errors, no redirect, we just didn't match anything
        ctx.status = 404;
        ctx.body = 'Not Found';
      }
    });
  };
}
