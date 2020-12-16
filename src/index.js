import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/login'
import Dashboard from './components/dashboard'

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/categoria" component={Dashboard}/>
          {/* <Route exact path="/details/:itemId" component={Details} /> */}
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>

    );
  }
}
ReactDOM.render(<Root />, document.getElementById("root"));

