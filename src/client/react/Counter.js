import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

// import CounterStore from '../../crossover/mobx/stores/CounterStore';

@observer(["counterStore"])
class Counter extends Component {

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.props.counterStore.incrementValue();
  }

  render() {
    return (
      <h2>Counter: {this.props.counterStore.value}</h2>
   );
  }
}

Counter.wrappedComponent.propTypes = {
  counterStore: PropTypes.object.isRequired,
};

export default Counter;
