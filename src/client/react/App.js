import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import { imageRequire } from '../../utils/universalRequire';

import { GithubIcon } from './svg/svgIcons';

// for the server return a reference to the
// path for this image. Otherwise, deal with
// it as a normal webpack import
const logo = imageRequire('logo.png');

export default class App extends Component {
  render() {
    // This is the newer example showing a better way to manage
    // tabs / page sections using something like react-router
    // instead of the contrived last example

    return (
      <div className="layout">
        <img src={logo} alt="Isn't it dainty?" />
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/lostpebble/koa-mobx-react-starter" className="blurb"><GithubIcon />koa-mobx-react-starter</a>
        <div className="tabs">
          <IndexLink to="/" className="tab" activeClassName="selected">User Profile</IndexLink>
          <Link to="/counter" className="tab" activeClassName="selected">Counter</Link>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};
