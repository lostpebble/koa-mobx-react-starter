import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import Counter from './Counter';
import UserProfile from './UserProfile';
import TabbedLayout from './TabbedLayout';

import { CTabs } from '../../crossover/constants/UIConstants';

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
    // should not be handled like this. There are better
    // ways, such as having a parent <Tabs> component with separate child
    // <Tab> components to split the different views and control switching
    // but that's out of the scope for this starter

    return (
      <TabbedLayout tabs={[CTabs.USER, CTabs.COUNTER]}>
        {currentTab}
      </TabbedLayout>
    );
  }
}

App.wrappedComponent.propTypes = {
  UIStore: PropTypes.object.isRequired,
};
