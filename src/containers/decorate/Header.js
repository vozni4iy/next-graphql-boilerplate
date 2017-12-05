import React, { Component } from 'react'
import { MainHeader } from 'src/components/styled'

class Header extends Component {
  render() {
    return (
      <MainHeader>
        <div>Logo</div>
        <div>Profile</div>
      </MainHeader>
    )
  }
}
