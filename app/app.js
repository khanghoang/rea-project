import 'babel-polyfill';
import './assets/css/main.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

// Create Redux store with initial state
const store = createStore(counterApp, initialState)

ReactDOM.render(
  (<Root />), document.getElementById('container')
);
