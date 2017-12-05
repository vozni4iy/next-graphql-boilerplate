import React, { Component } from 'react'
import { Customer, Vendor } from 'src/containers/pages'
import { CenterView } from 'src/components/styled'
import PropTypes from 'prop-types'
import { Router } from 'routes'

class MainPage extends Component {
  static propTypes = {
    url: PropTypes.object,
    store: PropTypes.object
  };

  render () {
    const {url, store} = this.props
    return (
      <CenterView>
        <button onClick={Router.pushRoute('customer')}>Customer</button>
        <button onClick={Router.pushRoute('vendor')}>Vendor</button>
      </CenterView>
    )
  }
}

export default MainPage
