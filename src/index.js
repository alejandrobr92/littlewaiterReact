import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { AuthProvider } from './firebase/login';
import PrivateRoute from './PrivateRoute';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/details/:itemId" component={Details} /> */}
            <Redirect from="/" to="/login" />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<Root />, document.getElementById('root'));
