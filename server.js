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

  // Render the component to a string
  fetchComponentData(store.dispatch, [<Root />], {})
    .then(() => {
      return renderToString(Root(store))
    })
    .then(html => {
      // Grab the initial state from our Redux store
      const initialState = store.getState()

      // Send the rendered page back to the client
      res.send(renderFullPage(html, initialState))
    })
    .catch(console.log)
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
