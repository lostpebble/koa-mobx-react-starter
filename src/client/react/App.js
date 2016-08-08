import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import Layout from './Layout';
import Counter from './Counter';
import UserProfile from './UserProfile';
import Tabs from './Tabs';

import { CTabs } from '../../crossover/constants/UIConstants';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

@observer(["UIStore"])
export default class App extends Component {
  render() {
    let currentTab = null;

    switch (this.props.UIStore.currentTab) {
      case CTabs.COUNTER:
        currentTab = <Counter />;
        break;
      case CTabs.USER:
        currentTab = <UserProfile />;
        break;
      default:
        currentTab = <div>NO TAB SELECTED. Choose one from above.</div>;
    }

    // This is a rather contrived example, as the tab management
    // should probably not be handled like this. There are better
    // ways, such as having a parent <Tabs> component with separate child
    // <Tab> components to split the different views and control switching

    return (
      <Layout>
        <Tabs tabs={[CTabs.USER, CTabs.COUNTER]} />
        {currentTab}
      </Layout>
    );
  }
}

App.wrappedComponent.propTypes = {
  UIStore: PropTypes.object.isRequired,
};