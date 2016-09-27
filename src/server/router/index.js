import makeRouter from 'koa-router';

const router = makeRouter();

router.get('/*', async(ctx, next) => {
  console.log("Setting counter random value and getting a random user profile");

  await ctx.state.mobx.CounterStore.setRandomNumber();
  await ctx.state.mobx.UserStore.getNewRandomUser();

  await next();
});

export default router;
