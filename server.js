global.window = {};

const path = require('path')
const express = require('express')
const React = require('react')
import configureStore from './app/configureStore'
import { Provider } from 'react-redux'
import Root from './app/containers/Root'
import {renderToString} from 'react-dom/server'
import {
  fetchPropertyList,
} from './app/actions/propertyActions';

// handle enzyme
var jsdom = require('jsdom').jsdom;
import {mount} from 'enzyme';

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
// end handle emzyme

const app = express()
app.use(express.static(path.join(__dirname, 'dist')));

function fetchComponentData(dispatch, components, params) {
  const needs = [fetchPropertyList]
  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}

// We are going to fill these out in the sections to follow
function handleRender(req, res) {

  // Create a new Redux store instance
  const store = configureStore({})
  const component = mount(Root(store))

  let interval = setInterval(() => {
    if (window.promises.length === 0) {
      const initialState = store.getState()
      res.send(renderFullPage(component.html(), initialState))
      clearInterval(interval);
    }
  }, 10);
}

function renderFullPage(html, initialState) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>REA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
      <div id='container'>${html}</div>
  </body>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>
  <script src="app.js"></script>
</html>
    `
}

app.get('/', handleRender)

// export default express();
module.exports = app;
