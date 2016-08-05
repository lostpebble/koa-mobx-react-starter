import { observable, action } from 'mobx';

const counterStore = observable({
	counterValue: 0,
});

counterStore.incrementCount = action(() => {
	counterStore.counterValue++;
});

export default counterStore;
