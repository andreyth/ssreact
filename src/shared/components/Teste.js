import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import MeuButao from 'components/Button'

class Teste extends PureComponent {
  nada = () => {
    window.alert('ZIDNAe')
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>MEU TÍTULO</title>
          <link rel='canonical' href='http://mysite.com/example' />
        </Helmet>
        <h1>TESTESEEEE</h1>
        <MeuButao />
        <button onClick={this.nada}>Testa Aqui</button>
      </div>
    )
  }
}

export default Teste
