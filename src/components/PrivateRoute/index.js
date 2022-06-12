// import Home from 'pages/Home'
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from 'utils/storage'
export default class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props
    // const currentLocation = this.props.location.pathname
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          if (hasToken()) {
            //有token登录
            // console.log(this.props)
            // console.log(routeProps)
            return <Component {...routeProps}></Component>
          } else {
            //跳转到登录页面的时候需要把当前地址传入可以直接登录成功跳转

            return (
              <Redirect
                to={{
                  pathname: '/login',
                  search: '?from=' + routeProps.location.pathname,
                  state: { from: routeProps.location.pathname },
                }}
              ></Redirect>
            )
          }
        }}
      ></Route>
    )
  }
}
