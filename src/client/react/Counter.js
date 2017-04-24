import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject("CounterStore") @observer
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
      <div className="content-block">
        <div className="counter">
          Counter: <span className="value">{this.props.CounterStore.value}</span>
        </div>
        <span className="extra-info">Starting value initialized on server (between 1 - 200)</span>
      </div>

    );
  }
}

Counter.wrappedComponent.propTypes = {
  CounterStore: PropTypes.object.isRequired,
};

export default Counter;
