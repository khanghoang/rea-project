require("babel-register");
const path = require('path')
const Express = require('express')
const React = require('react')
const configureStore = require('./app/configureStore')
const { Provider } = require('react-redux')
const Root = require('./app/containers/Root')
const {renderToString} = require('react-dom/server')

const app = Express()
const port = 3000

// This is fired every time the server side receives a request
app.use(handleRender)

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

app.listen(port);
