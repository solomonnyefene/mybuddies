

import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
// import {} from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers/rootReducer'




const store = createStore(reducers, {}, applyMiddleware(
    promiseMiddleware,
    createLogger({ collapsed: true }),
));

export  default store