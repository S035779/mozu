import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './pages/App/App';
import Login from './pages/Login/Login';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
    <Route exact path='/' component={App} />
    <Route path='/login' component={Login} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app')); 
