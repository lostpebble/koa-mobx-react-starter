import AllStores from './allStores';

// Creating and hydrating stores in this way saves
// time, and only requires that we remember to put
// our stores in the "allStores.js" file imported above

// This function takes care of helping stores communicate with
// each other. If there is an array defined on any store named
// "linkedStores", the array elements (containing exact names of other stores)
// are used here to "inject" the actual store objects into that store
// so it can be access directly
function linkStores(stores) {
  Object.keys(stores).forEach((currentStore) => {
    if (stores[currentStore].hasOwnProperty('linkedStores')) {
      const linkStoreKeys = stores[currentStore].linkedStores || [];

      if (linkStoreKeys.length === 0) {
        console.warn(`Store ${currentStore} has an empty linkedStores property.`);
      }

      linkStoreKeys.forEach((linkStore) => {
        stores[currentStore][linkStore] = stores[linkStore];
      });
    }
  });
}

let finalStores = null;

// This function allows the use of stores outside of
// "traditional" means, such as decorating a React component with
// @observer. This is useful for things like path matching in React-Router
// and the subsequent manipulation of stores. It returns an object
// containing all stores. Should probably be used sparingly.
export function getFinalStores() {
  if (finalStores) {
    return finalStores;
  }

  throw new Error("Couldn't get final stores. They haven't been set yet.");
}

// Used on the server, to start with a set of fresh stores
// to be manipulated before rendering our first React output
export function getFreshStores() {
  const freshStores = {};

  Object.keys(AllStores).forEach((value) => {
    freshStores[value] = new AllStores[value];
  });

  linkStores(freshStores);
  finalStores = freshStores;

  return freshStores;
}

// This creates our stores from state that has been provided
// on the page during our first rendering of React- basically
// hydrating our client state with that which was manipulated
// on the server (above) so we start on the same page (so to say)
export function createStoresFromState(state) {
  const createdStores = {};

  Object.keys(AllStores).forEach((value) => {
    createdStores[value] = new AllStores[value](state[value]);
  });

  // tack on the stores that need to communicate with each other
  linkStores(createdStores);
  finalStores = createdStores;

  return createdStores;
}
