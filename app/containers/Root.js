import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);

const root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default root;
