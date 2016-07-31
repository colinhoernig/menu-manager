import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import App from './Components/App';
import NotFound from './Components/NotFound';
import RestaurantPicker from './Components/RestaurantPicker';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={RestaurantPicker} />
    <Route path="/restaurant/:restaurantId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
