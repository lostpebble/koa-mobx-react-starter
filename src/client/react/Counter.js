import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

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
      <div className="counter">Counter: <span className="value">{this.props.CounterStore.value}</span></div>
   );
  }
}

Counter.wrappedComponent.propTypes = {
  CounterStore: PropTypes.object.isRequired,
};

export default Counter;
