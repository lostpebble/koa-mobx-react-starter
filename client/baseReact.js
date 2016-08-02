import React from 'react';

import { AppContainer } from 'react-hot-loader';
import App from './React/App';

/*
*  This file is important for the crossover between server and client (isomorphic / universal).
*  It defines a single, identical starting point for ReactJS page layout on both sides.
* */

export default function baseReact(options) {
	return (
		<AppContainer>
			<App />
		</AppContainer>
	);
}
