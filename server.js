global.window = {};

const path = require('path')
const express = require('express')
const React = require('react')
import configureStore from './app/configureStore'
import { Provider } from 'react-redux'
import Root from './app/containers/Root'
const {renderToString} = require('react-dom/server')

const app = express()

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore({})

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <Root />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState))
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.get('/', handleRender)

// export default express();
module.exports = app;
