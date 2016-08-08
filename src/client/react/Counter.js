import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

// import CounterStore from '../../crossover/mobx/stores/CounterStore';

@observer(["CounterStore"])
class Counter extends Component {

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.props.CounterStore.incrementValue();
  }

  render() {
    return (
      <h2>Counter: {this.props.CounterStore.value}</h2>
   );
  }
}

Counter.wrappedComponent.propTypes = {
  CounterStore: PropTypes.object.isRequired,
};

export default Counter;
