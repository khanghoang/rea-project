import {
  createStore,
  applyMiddleware
} from 'redux';
import reducers from './reducers';
import promisesMiddleware from './middlewares/promises';
import thunk from 'redux-thunk';

const store = createStore(reducers);

const configureStore = (initialState) => {
  const middlewares = [thunk, promisesMiddleware]
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store;
}

export default configureStore;
