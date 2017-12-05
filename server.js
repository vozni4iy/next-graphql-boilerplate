const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
global.navigator = global.navigator || {};

const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  navigator.userAgent = req.headers['user-agent'] || navigator.userAgent;
  app.render(req, res, route.page, query)
})

app.prepare()
.then(() => {
  const server = express()

  server.use(handler)

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
