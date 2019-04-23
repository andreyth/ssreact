import React from 'react'
import { connect } from 'react-redux'

const Teste = (props) => {
  return (
    <div>
      <h1>TESTESEEEE</h1>
      <span>Olá {props.teste.user}</span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    teste: state.teste
  }
}

export default connect(mapStateToProps)(Teste)
