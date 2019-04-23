import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

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
        <span>Olá {this.props.teste.user}</span>
        <button onClick={this.nada}>Testa Aqui</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teste: state.teste
  }
}

export default connect(mapStateToProps)(Teste)
