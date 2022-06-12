import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'
import { Redirect } from 'react-router-dom'
export default class AutuRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) => {
          if (hasToken()) {
            //有tiken登录
            return <Component {...props}></Component>
          } else {
            return <Redirect to="/login"></Redirect>
          }
        }}
      ></Route>
    )
  }
}
