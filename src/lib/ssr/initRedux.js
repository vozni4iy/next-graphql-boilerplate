/*global process:true*/
/*eslint no-undef: "error"*/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from 'src/reducers'

let reduxStore = null
let check1 = false
let check2 = false
let check3 = false

if (typeof window !== 'undefined') {
  check1 = window && typeof window === 'object'
  check2 = window && typeof window.devToolsExtension !== 'undefined'
  check3 = !process.env.prod;
  // disable console log on production
  if (process.env.prod && check1) {
    //window.console.log = function() {};
  }
}
let devToolsCheck = check1 && check2 && check3;
let devTools = devToolsCheck ? window.devToolsExtension() : f => f;

function create (apollo, initialState = {}) {
  return createStore(
    combineReducers({ // Setup reducers
      ...reducers,
      apollo: apollo.reducer()
    }),
    initialState, // Hydrate the store with server-side data
    compose(
      applyMiddleware(thunkMiddleware),
      applyMiddleware(apollo.middleware()), // Add additional middleware here
      devTools
    )
  )
}

export default function initRedux (apollo, initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(apollo, initialState)
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(apollo, initialState)
  }

  // Enable hot module replacement for reducers if we need this in future
  /*if (module.hot) {
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
      });
  }*/

  return reduxStore
}
