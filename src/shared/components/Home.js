import React, { PureComponent } from 'react'
import loadable from '@loadable/component'
// import Nada from 'components/Nada'

const Nada = loadable(() => import('components/Nada'), {
  fallback: <div>Loading...</div>
})

class Home extends PureComponent {
  render () {
    return (
      <Nada />
    )
  }
}

export default Home
