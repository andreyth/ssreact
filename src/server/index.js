import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { resolve } from 'path'
import compression from 'compression'
import { matchPath } from 'react-router-dom'

import routes from 'shared/routes'
import store from 'shared/store'
import renderer from './renderer'
import { setCurrentUser } from 'shared/ducks/auth'

const app = express()
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}

app.use(cors())

app.use(express.static(resolve(__dirname, '..', 'public')))

app.get('/favicon.ico', (req, res) => res.status(204))

app.get('/api/login', (req, res) => {
  res.json({ token: '234nsdfm9' })
})

app.get('*', (req, res, next) => {
  if (req.cookies.token) {
    const tokenValue = req.cookies.token
    store.dispatch(setCurrentUser({ token: tokenValue }))
  } else {
    store.dispatch(setCurrentUser({}))
  }

  res.set('content-type', 'text/html')
  const activeRoute = routes.find(route => {
    let matchRoute = matchPath(req.url, route.path)
    if (matchRoute && matchRoute.isExact === true) {
      return route
    }
  })

  const promise = activeRoute.loadData ? activeRoute.loadData(store) : Promise.resolve()
  if (promise instanceof Promise) {
    promise.then(() => {
      renderer(req, res, store, {})
    }).catch(next)
  } else {
    renderer(req, res, store, {})
  }
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})
