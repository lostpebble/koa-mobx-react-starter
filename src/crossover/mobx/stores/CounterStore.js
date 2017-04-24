import { observable, action } from 'mobx';

import { getRandomNumber } from '../../api/fakeDataApi';

export default class CounterStore {
  @observable value = 0;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  @action incrementValue() {
    this.value += 1;
  }

  @action setValue(value) {
    this.value = value;
  }

  @action
  async setRandomNumber() {
    this.setValue(await getRandomNumber());
  }
}
