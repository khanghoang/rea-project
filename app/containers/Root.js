import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';

// const store = configureStore();

// Grab the state from a global injected into server-generated HTML
// const initialState = window.__INITIAL_STATE__
const initialState = {}

// Create Redux store with initial state
const store = configureStore(initialState)

const root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default root;
