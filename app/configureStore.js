import {
  createStore,
  applyMiddleware
} from 'redux';
import reducers from './reducers';
import promisesMiddleware from './middlewares/promises';
import thunk from 'redux-thunk';

const store = createStore(reducers);

const configureStore = () => {

  const logger = store => next => action => {
    console.log(action);
  }

  const middlewares = [thunk, promisesMiddleware, logger];
  const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
  )

  return store;
}

export default configureStore;
