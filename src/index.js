import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/login'
import store, {saveState} from './redux/store'
import Dashboard from './components/dashboard'

class Root extends Component {
  
  componentDidMount(){
    window.addEventListener('unload',saveState)
  }
  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/dashboard"  component={Dashboard} />
            <Route exact path="/login"  component={Login} />
            {/* <Route exact path="/details/:itemId" component={Details} /> */}
            <Redirect from="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
ReactDOM.render(<Root />, document.getElementById("root"));

