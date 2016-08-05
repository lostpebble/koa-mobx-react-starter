import React, { Component } from 'react';
import { observer } from 'mobx-react';

import CounterStore from '../../crossover/mobx/stores/CounterStore';

@observer
export default class Counter extends Component {

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    CounterStore.incrementCount();
  }

  render() {
    return (
      <h2>Counter: {CounterStore.counterValue}</h2>
   );
  }
}

