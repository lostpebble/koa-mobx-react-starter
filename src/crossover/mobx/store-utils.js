import AllStores from './allStores';

// while these two methods could be merged together
// sometimes I like to be explicit to better
// conceptualise things

// Creating and hydrating stores in this way saves
// time, and only requires that we remember to put
// our stores in the "allStores.js" file imported above

export function getFreshStores() {
	const freshStores = {};

	Object.keys(AllStores).forEach((value) => {
		freshStores[value] = new AllStores[value];
	});

	return freshStores;
}

export function createStoresFromState(state) {
	const createdStores = {};

	Object.keys(AllStores).forEach((value) => {
		createdStores[value] = new AllStores[value](state[value]);
	});

	return createdStores;
}
