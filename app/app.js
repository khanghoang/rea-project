import 'babel-polyfill';
import './assets/css/main.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

ReactDOM.render(
  (<Root />), document.getElementById('container')
);
