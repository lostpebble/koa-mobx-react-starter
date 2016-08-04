import { observable, action } from 'mobx';

const initialState = {
	counterValue: 0
};

export default class AppStore {

	@observable counterValue = 0;

	constructor(setState) {
		// const state = Object.assign({}, initialState, setState.appStore)
		this.counterValue = initialState && initialState.appStore && initialState.appStore.counterValue ? initialState.appStore.counterValue : 0;
	}

	@action
	increaseCount() {
		this.counterValue++;
	}

	toJson() {
		return {
			counterValue: this.counterValue,
		};
	}
}
