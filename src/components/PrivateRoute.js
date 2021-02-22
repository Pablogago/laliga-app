import React from 'react';
import { useSelector } from 'react-redux';
import { Route,  Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const user = useSelector(state => state.authedUser);

  return (
   <Route {...rest} render={() => {
      return user ? children : <Redirect to="/login"/>
   }}>
   </Route>
  );
}

export default PrivateRoute;
