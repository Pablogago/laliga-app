import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import './App.css';

function App() {
  const theme = useSelector(state => state.theme);

  return (
    <React.Fragment>
      { theme.data && <ThemeProvider theme={theme.data}>
        <GlobalStyles />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute>
        </Switch>
        <div id="modal-root"></div>
      </ThemeProvider>
      }
    </React.Fragment>
  );
}

export default App;
