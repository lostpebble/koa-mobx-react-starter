import { observable, action } from 'mobx';

export default class UserStore {

	@observable userProfile = {};
	@observable userLoaded = false;
}
