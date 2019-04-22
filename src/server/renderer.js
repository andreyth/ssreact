import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { resolve } from 'path'
import fs from 'fs'
import { getLoadableState } from 'loadable-components/server'

import Home from 'components/Home'

const renderer = (req, res, next) => {
  console.log('OPA')
  const filePath = resolve(__dirname, '..', 'public', 'main.html')

  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
    if (err) {
      console.error('err', err)
      return res.status(404).end()
    }

    const app = (<Home />)

    const loadableState = await getLoadableState(app)
    const html = ReactDOMServer.renderToString(app)

    let newHtml = htmlData.replace(
      '<div id="root"></div>',
      `
      <div id="root">${html}</div>
      ${loadableState.getScriptTag()}
      `
    )

    return res.send(
      newHtml
    )
  })
}

export default renderer
