import { observable, action, runInAction } from 'mobx';

import { getRandomUser } from '../../api/userApi';

export default class UserStore {

  @observable userProfile = {};
  @observable loadingUser = false;
  @observable loadingError = false;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  @action getNewRandomUserSuccess(userData) {
    this.loadingUser = false;
    this.loadingError = false;
    this.userProfile = userData;
  }

  @action
  async getNewRandomUser() {
    if (!this.loadingUser) {
      this.loadingUser = true;

      let newUser = null;

      try {
        newUser = await getRandomUser();

        // We call another of our actions, because technically
        // what happens after "await" is a separate function in a
        // way, and state changes can only happen within an
        // "official" action function so to say. We could also
        // use the "runInAction" method (as seen below)
        this.getNewRandomUserSuccess(newUser);
      } catch (error) {
        runInAction("Error occurred trying to get random user", () => {
          this.loadingUser = false;
          this.loadingError = true;

          // Need to do something with this error (such as display an
          // error message now that loadingError = true)
        });
      }
    } else {
      console.log("Still busy loading random user...");
    }
  }
}
