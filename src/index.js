import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from "react-router-dom"
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { setAuthToken, logout, setCurrentUser } from './actions/authActions'
// import { fetchCurrentUser } from './actions/userActions';
import URLSearchParams from 'url-search-params';
import setAuthorizationToken from './utils/setAuthorizationToken';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import jwtdecode from 'jwt-decode';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import { ActionCableProvider } from 'react-actioncable-provider';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const store = createStore(

  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

);

var searchParams = new URLSearchParams(window.location.search);
var auth_token = searchParams.get('auth_token');

if(auth_token && !localStorage.accessToken) {
  store.dispatch(setAuthToken(auth_token))
}

// Check if token is valid
if(localStorage.accessToken && localStorage.accessTokenDate) {

  var now = (new Date()).getTime()
  // 24 hours in milliseconds
  var expiry = (86400000)

  // check date of token
  if( (now - parseInt(localStorage.accessTokenDate, 10)) >= expiry ) {
    store.dispatch(logout());
    // redirect to login?
  } else {
    setAuthorizationToken(localStorage.accessToken);
    cookies.set('lead_tn', localStorage.accessToken, { path: '/' });
    store.dispatch(setCurrentUser(jwtdecode(localStorage.accessToken)));

    // store.dispatch(fetchCurrentUser(localStorage.accessToken));
  }

} else {
    setAuthorizationToken();
}

ReactDOM.render(
  <BrowserRouter>
      <Provider store={store}>
          <Route component={App} />
      </Provider>
  </BrowserRouter>,
document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
