import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './firebase/login';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
};
export default PrivateRoute;
