import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import compression from 'compression'

import renderer from './renderer'

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}

app.use(cors())

app.use(express.static(resolve(__dirname, '..', 'public')))

app.get('/favicon.ico', (req, res) => res.status(204))

app.get('*', (req, res, next) => {
  res.set('content-type', 'text/html')
  res.send(renderer(req))
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})
