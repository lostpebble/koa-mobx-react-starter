import { observable, action, extendObservable } from 'mobx';

export default class UserStore {

	@observable userProfile = {};
	@observable userLoaded = false;

	constructor(initialState) {
		Object.assign(this, initialState);
	}

	@action setUser(userData) {
		this.userProfile = userData;
	}
}
