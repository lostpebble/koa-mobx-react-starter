import { observable, action } from 'mobx';

const initialState = {
	counterValue: 0,
};

export default class CounterStore {

	@observable counterValue = 0;

	constructor(counter) {
		Object.assign(this, counter);
		// this.counterValue = initialState && initialState.appStore && initialState.appStore.counterValue ? initialState.appStore.counterValue : 0;
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
