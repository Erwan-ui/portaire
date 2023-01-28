import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UpdatePaymentFormPage from './pages/UpdatePaymentFormPage';

const App = () => {
return (
<Router>
<Routes>
<Route exact path="/" element={<HomePage/>} />
<Route path="/payment-form" element={<UpdatePaymentFormPage/>} />
</Routes>
</Router>
);
};

export default App;