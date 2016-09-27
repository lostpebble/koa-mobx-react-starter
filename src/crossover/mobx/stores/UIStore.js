import { observable, action } from 'mobx';

// This store is now empty thanks to React-Router controlling the tabs,
// although for any project an over-arching UI store
// is usually a must, so it remains as a skeleton to be
// filled.
export default class UIStore {

  constructor(initialState) {
    Object.assign(this, initialState);
  }
}
