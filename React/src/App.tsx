import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Welcome from './components/welcome';  // Corrected import
import Protected from './services/Protected';
import './App.css';
import Products from './components/Product';
import Invoice from './components/Invoice';
import InvoicePdf from './components/InvoicePdf';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/welcome" element={<Protected Component={Welcome} />} />
        <Route path="/product" element={<Protected Component={Products} />} />
        <Route path="/invoice" element={<Protected Component={Invoice} />} />
        <Route path="/downlood" element={<Protected Component={InvoicePdf} />} />
      </Routes>
    </Router>
  );
};

export default App;
