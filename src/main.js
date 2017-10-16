import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './pages/App/App';

ReactDOM.render((
  <BrowserRouter>
    <Route exact path="/" component={App} />
  </BrowserRouter>
), document.getElementById('app'));

