import makeRouter from 'koa-router';

import { getRandomNumber } from '../internalApi/fakeDataApi';

// import CounterStore from '../../crossover/mobx/stores/CounterStore';

const router = makeRouter();

router.get('/', async(ctx, next) => {
	console.log("Setting counter random value");

	ctx.state.mobx.counterStore.setValue(await getRandomNumber());

	await next();
});

export default router;
