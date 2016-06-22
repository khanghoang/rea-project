import 'babel-polyfill';
import './assets/css/main.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(
  (<App />), document.getElementById('container')
);
