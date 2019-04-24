import React from 'react'
import { renderToString } from 'react-dom/server'
import { resolve } from 'path'
import { Provider } from 'react-redux'
import { ChunkExtractor } from '@loadable/server'
import { StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

import LoadRoutes from 'components/route/LoadRoutes'

const stats = {
  client: resolve(__dirname, '..', 'public', 'loadable-stats.json'),
  server: resolve(__dirname, '..', 'build-server', 'loadable-stats.json')
}

const renderer = (req, store) => {
  const app = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <LoadRoutes />
      </StaticRouter>
    </Provider>
  )

  const extractor = new ChunkExtractor({ statsFile: stats.client })
  const jsx = extractor.collectChunks(app)

  const markup = renderToString(jsx)
  const helmet = Helmet.renderStatic()

  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
        ${extractor.getScriptTags()}
      </body>
    </html>
  `
  return html
}

export default renderer
