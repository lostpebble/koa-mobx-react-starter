import { observable, action } from 'mobx';
import { CTabs } from '../../constants/UIConstants';

export default class UIStore {
  @observable currentTab = CTabs.USER;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  @action setTab(tab) {
    this.currentTab = tab;
  }
}
