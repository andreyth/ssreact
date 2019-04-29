import React, { PureComponent } from 'react'
import loadable from '@loadable/component'
import { connect } from 'react-redux'
import { login, logout } from 'shared/ducks/auth'
import { Redirect } from 'react-router-dom'

// import Nada from 'components/Nada'

const Nada = loadable(() => import('components/Nada'), {
  fallback: <div>Loading...</div>
})

class Home extends PureComponent {
  state = {
    redirect: false
  }

  logar = () => {
    this.props.login().then(() => this.setState({ redirect: true })).catch(err => console.log(err))
  }

  sair = () => {
    this.props.logout()
  }

  render () {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/teste' />
    }

    return (
      <>
        <Nada />
        <button onClick={this.logar}>LOGAR</button><br />
        <button onClick={this.sair}>SAIR</button>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { login, logout })(Home)
