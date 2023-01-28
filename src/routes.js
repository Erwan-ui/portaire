import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UpdatePaymentFormPage from './pages/UpdatePaymentFormPage';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/payment-form" component={UpdatePaymentFormPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
