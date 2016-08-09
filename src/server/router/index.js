import makeRouter from 'koa-router';

import { getRandomNumber } from '../../crossover/api/fakeDataApi';
// import { getRandomUser } from '../../crossover/api/userApi';

const router = makeRouter();

router.get('/', async(ctx, next) => {
	console.log("Setting counter random value");

	ctx.state.mobx.CounterStore.setValue(await getRandomNumber());
	await ctx.state.mobx.UserStore.getNewRandomUser();

	await next();
});

export default router;
