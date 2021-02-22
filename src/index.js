import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { setToLS } from './utils/storage';
import * as themes from './theme/schema.json';
import * as serviceWorker from './serviceWorker';

import App from './App';
import useTheme from './hooks/useTheme/index';

import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware/index.js';


const Index = () => {
  setToLS('all-themes', themes.default);
  const theme = useTheme();
  return <App />;
}

const store = createStore(
  reducer,
  middleware
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Index />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();