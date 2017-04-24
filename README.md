# koa-mobx-react-starter

![the Jackson Pollock of github logos](https://raw.github.com/lostpebble/koa-mobx-react-starter/master/src/images/screenshot.png?raw=true "Koa MobX React Goodness")

Along with aiming to use the bleeding-edge of JavaScript (within reason- and all thanks to [Babel](https://babeljs.io/)), this repository represents a choice of frameworks and libraries I think work well together for an enjoyable NodeJS and frontend coding experience.

##### New :sunny: - React-Router
##### New :sunny: - Marko

A short rundown of the various technologies:

### Server
- [Koa](http://koajs.com/) - A Node server framework with an eye on the future, using the async-await syntax. Server code compiled back to a widely adopted standard of JavaScript using Babel.
- [Marko](http://markojs.com/) - Fast HTML rendering engine, into which we slot in our React-generated HTML

### Crossover
- [MobX](https://github.com/mobxjs/mobx "MobX") - Awesome state management library, makes it so easy I feel like I'm cheating somehow. State stores initialized on the server, altered by some actions depending on request, and then passed over to the client to continue its state-altering journey.
- [ReactJS](https://facebook.github.io/react/) - Build views on the server according to state and then inject functionality into those already built views on the client, and continue calling MobX actions and re-rendering accordingly
- [React-Router](https://github.com/ReactTraining/react-router) - A routing solution for ReactJS. Works great with server-side rendering too, catching all possible routes we may want to render.

### Client
- Javascript compiled with [Webpack](https://webpack.github.io/) - A bundler that reads your entry JavaScript and various other files and creates a distribution build of them (using various options and plugins) for efficient client-side delivery
- Client Javascript mostly involves more React and MobX goodness for great interaction

## Folder and Module Structure

<table>
  <tbody>
  <tr>
    <th align="left">Folder</th>
    <th align="left">What's in it</th>
  </tr>
  <tr>
    <td><code>/client</code></td>
    <td align="left">
      <code>/react</code>
      <ul>
        <li>
          Regular React components, main <code>App</code> component and whatever else makes up the layout.
        </li>
        <li>
          <code>/svg</code> - SVG React components. Placed directly in the code as if they were normal functional React components. Much easier to incorporate into layouts. They're usually very small in size (1-3kb) so it's not a data hog and means they load instantly with SSR too.
        </li>
        <li>
          <code>/routes</code> - The React-Router defined routes for our app
        </li>
      </ul>
      <code>/styles</code>
      <ul>
        <li>
          A bunch of organised <code>.scss</code>, Sass style modules. The main one, <code>entry.scss</code>, is included in our <code>entry.js</code> so webpack knows it's part of our client bundle (and hot reloading works because it becomes part of the "hot" bundle)
        </li>
        <li>
          By using Webpack, when we compile for production, these styles are automatically extracted into a seperate styles.css file that we can include in the head of our html.
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>/crossover</code></td>
    <td align="left">
      <code>/api</code>
      <ul>
        <li>
          API functions (returning promises) that work on both client and server side using <code>isomorphic-fetch</code>
        </li>
        <li>
          These APIs are most likely only going to be called from MobX stores, since all our state is managed by them and it makes it very easy to reason about what we're doing if there are only a few endpoint actions (functions) we have to call on both client and server.
        </li>
      </ul>
      <code>/constants</code>
      <ul>
        <strike>
        <li>
          Pretty self explanatory, just constants to be used throughout the app. For now it's just different types of tabs. This allows us to think about certain parts of the UI as one, constant thing and therefore we can create things like language dictionaries that can be access according to a language constant and the UI constant but the components remain exactly the same.
        </li>
        </strike>
        <li>
          For now there are no constants, as before there used to be some to keep track of tabs- that is managed by the different routes in React-Router now. BUT constants are still a very important part of an app's ecosystem in order to maintain consistency between things. It is left here as an empty folder to be expanded upon.
        </li>
      </ul>
      <code>/mobx</code>
      <ul>
        <li>
          <code>/stores</code> - All the MobX stores in seperate modules, which are basically just classes with <code>@decorators</code> to keep things neat. some of them access API files from above.
        </li>
        <li>
          <code>allStores.js</code> - The only part of the code that feels too static too me, but required for the next step. We just bundle all the modules from the folder above into a single exported object. This enables what happens in the next file.
        </li>
        <li>
          <code>store-utils.js</code> - Creating and hydrating stores (for now the only utils). It requires that we remember to put our stores in the imported <code>allStores.js</code> above so they are included in the processes. Used on the server side first to create new stores (which are then used normally before the request returns), and then hydrated on the client side (taking the state that came from the server and mirroring it exactly on the client side MobX stores).
        </li>
      </ul>
      <code>entry.js</code>
      <ul>
        <li>
          The most important crossover file. It has a <code>baseReact()</code> function which returns our main React app (components) that we want to mount onto our page. This is so there is a single source of truth for both server and client. It is also the entry file for our client javascript, so it takes control of getting the MobX state from the server-generated page and injecting that into our client MobX stores before rendering the exact same React components the server just spat out. But it is not actually rendered again, because React is smart, React simply sees it's all the same so doesn't re-render the dom but simply makes what's already there dynamic and functional.
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>/images</code></td>
    <td align="left">
      Self explanatory
    </td>
  </tr>
  <tr>
    <td><code>/server</code></td>
    <td align="left">
      <code>babel-server.js</code>
      <ul>
        <li>
          The entry point for our server. It makes use of <code>babel-register</code> which insures that all further files required by our server will be transpiled to ES5 javascript code (understood by Node).
        </li>
      </ul>
      <code>server.js</code>
      <ul>
        <li>
          Our actual server file. It's a basic Koa server, makes use of some base middleware imported from the <code>/middleware</code> folder and a router from <code>/router</code>
        </li>
        <li>
          Take a look inside <code>/middleware/crossoverMiddleware.js</code> to see how MobX state is first created, and then used to render our React at the end of a request.
        </li>
        <li>
          The amazing part about Koa is its use of <code>async</code> functions and using the <code>await</code> key word for request/response streams. Makes things much easier to reason about, especially with our MobX stores also returning <code>async / await</code> functions which themselves can be <code>await</code>'ed. Take a look inside the router file to see it in action.
        </li>
        <li>
          Within our server we make use of Pug as the view engine. We also serve files in the <code>/static</code> directory thanks to some middleware which you can find in the <code>/middleware/basicMiddleware.js</code> file.
        </li>
      </ul>
    </td>
  </tr>
  </tbody>
</table>

## Get Going:

#### For starters:

```
npm install
```

Or, even better (if you are using `yarn`):
```
yarn install
```

#### Then
To start the development server (which is what you want most of the time)

```
npm run dev
```

To start the production server is the usual `npm start`, but the code has to be built first, so:
```
npm run build
npm start
```
Or for quick production testing `npm run build-start`

Before deployment to a production server, your code should always be built first- so that the default `npm start` can be used to spin up quickly.

## Some Extra Configuration Information

I'm using the `babel-register` module which is required before any other server code and automatically converts any further requires / imports to ES5 javascript. This is for development purposes only (`npm run dev` ) - as recommended.

The server code (and the React code which is used on the server) is then built into the `/built` folder for production use ( `npm start` )
