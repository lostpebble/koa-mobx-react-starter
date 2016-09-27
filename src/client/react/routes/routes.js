import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../App';
import UserProfile from '../UserProfile';
import Counter from '../Counter';

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={UserProfile}/>
    <Route path="/counter" component={Counter}/>
  </Route>
);

export default routes;
