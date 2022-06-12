import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from 'pages/Layout'
import Login from 'pages/Login'
import PrivateRoute from 'components/PrivateRoute'

import history from 'utils/history'
/**
 * import {HashRouter} from 'react-router-dom'
 * hashRouter=<Router history={crerateHashHistory()}><Router>
 * BrowserRouter=<Router history={crerateBrowserHistory()}><Router>
 */

function App() {
  return (
    <Router history={history}>
      <div className="App"></div>
      <Switch>
        <Redirect exact from="/" to="/login"></Redirect>
        {/* <AutuRoute path="/home" component={Home}></AutuRoute> */}
        <PrivateRoute path="/home" component={Home}></PrivateRoute>
        <Route path="/login" component={Login}></Route>
        {/* <Route
          path="/login"
          render={(props) => {
            return <Login {...props}></Login>
          }}
        ></Route> */}
        <Route path="/*" component={Login}></Route>
      </Switch>
    </Router>
  )
}

export default App
