import 'babel-polyfill';
import './assets/css/main.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './configureStore';

// const store = configureStore();

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__ || {}
// const initialState = {}

// Create Redux store with initial state
const store = configureStore(initialState)

ReactDOM.render(
  (Root(store)), document.getElementById('container')
);
