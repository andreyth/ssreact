import React from 'react'
import { renderToString } from 'react-dom/server'
import { resolve } from 'path'
import { Provider } from 'react-redux'
import { ChunkExtractor } from '@loadable/server'
import { StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'

import App from 'shared/App'

const stats = {
  client: resolve(__dirname, '..', 'public', 'loadable-stats.json'),
  server: resolve(__dirname, '..', 'build-server', 'loadable-stats.json')
}

const renderer = (req, res, store) => {
  const sheet = new ServerStyleSheet()

  const app = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  )

  try {
    const extractor = new ChunkExtractor({ statsFile: stats.client })
    const jsx = extractor.collectChunks(app)

    const markup = renderToString(sheet.collectStyles(jsx))
    const styleTags = sheet.getStyleTags()
    const helmet = Helmet.renderStatic()

    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${extractor.getLinkTags()}
          ${extractor.getStyleTags()}
          ${styleTags}
        </head>
        <body>
          <div id="root">${markup}</div>
          <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `
    res.send(html)
  } catch (error) {
    console.error(error)
    res.send('<h1>ERRO</h1>')
  } finally {
    sheet.seal()
  }
}

export default renderer
