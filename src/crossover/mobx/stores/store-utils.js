import CounterStore from './CounterStore';

export function getFreshStores() {
	return {
		counterStore: new CounterStore,
	};
}

export function createStoresFromState(state) {
	return {
		counterStore: new CounterStore(state.counterStore),
	};
}
