import { observable, action } from 'mobx';

export default class CounterStore {
	@observable value = 0;

	constructor(initialState) {
		Object.assign(this, initialState);
	}

	@action incrementValue() {
		this.value++;
	}

	@action setValue(value) {
		this.value = value;
	}
}

// const singleton = new CounterStore();
// export default singleton;

/*
const counterStore = observable({
	counterValue: 0,
});

counterStore.incrementCount = action(() => {
	counterStore.counterValue++;
});

export default counterStore;
*/
