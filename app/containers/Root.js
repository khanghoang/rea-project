import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';

const store = configureStore();

const root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default root;
