import React from 'react'
import { renderToString } from 'react-dom/server'
import { resolve } from 'path'
// import fs from 'fs'
import { ChunkExtractor } from '@loadable/server'
import { StaticRouter } from 'react-router-dom'

import LoadRoutes from 'components/route/LoadRoutes'

const stats = {
  client: resolve(__dirname, '..', 'public', 'loadable-stats.json'),
  server: resolve(__dirname, '..', 'build-server', 'loadable-stats.json')
}

const renderer = (req) => {
  const app = (
    <StaticRouter location={req.url} context={{}}>
      <LoadRoutes />
    </StaticRouter>
  )

  const extractor = new ChunkExtractor({ statsFile: stats.client })
  const jsx = extractor.collectChunks(app)

  const markup = renderToString(jsx)

  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${markup}</div>
        ${extractor.getScriptTags()}
      </body>
    </html>
  `
  return html
}

export default renderer
