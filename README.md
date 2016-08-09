# koa-mobx-react-starter

![the Jackson Pollock of github logos](https://raw.github.com/lostpebble/koa-mobx-react-starter/master/src/images/logo.png?raw=true "Koa MobX React Goodness")

Along with aiming to use the bleeding-edge of JavaScript (within reason- and all thanks to [Babel](https://babeljs.io/)), this repository represents a choice of frameworks and libraries I think work well together for an enjoyable NodeJS and frontend coding experience.

A short rundown of the various technologies:
###Server
- [Koa](http://koajs.com/) - A Node server framework with an eye on the future, using the async-await syntax. Server code compiled back to a widely adopted standard of JavaScript using Babel.
- [Pug](https://github.com/pugjs) (formerly Jade) for views - Concise HTML view engine, into which we slot in our React-generated HTML

###Crossover
- [MobX](https://github.com/mobxjs/mobx "MobX") - Hold state initially on the server, and then pass it over to the client
- [ReactJS](https://facebook.github.io/react/) - Build views on the server and inject functionality into those already built views on the client

###Client
- Javascript compiled with [Webpack](https://webpack.github.io/) - A bundler that reads your entry JavaScript and various other files and creates a distribution build of them (using various options and plugins) for efficient client-side delivery
- Client Javascript mostly involves more React and MobX goodness for great interaction

##Get Going:

For starters:

```
npm install
```

Then to start the development server (which is what you want most of the time)

```
npm run dev
```

And to start the production server is the usual `npm start`, but the code has to be built first, so:
```
npm run build
npm start
```
Or for quick production testing `npm run buildstart`

Before deployment to a production server, your code should always be built first- so that the default `npm start` can be used to spin up quickly.

##Important Configuration Information

~~I've used a file watcher built into WebStorm to automatically process my ES2016/2017 server code through Babel so that it always stays up to date and runs without much hassle on Node. This is configured in the IDE, but can also be achieved with many other methods of your choice (manually through `babel-cli` with the `--watch` option for example).~~

Since the above method became more complicated upon trying to make my server files more modular and separated, I'm now using the `babel-register` module which is required before any other server code and automatically converts any further requires / imports to ES5 javascript. Once NodeJS officially supports import / export and async functions, this shouldn't be a problem any more.

Also, there is an `.eslint` file included with the configuration used for this project, but I run my linting globally so you will have to set up your own linting accordingly. To make it easier, to install the modules I use for ESLint you can do: 

```
npm install --save-dev babel-eslint@6 eslint-config-airbnb eslint@^2.9.0 eslint-plugin-jsx-a11y@^1.2.0 eslint-plugin-import@^1.7.0 eslint-plugin-react@^5.0.1
```