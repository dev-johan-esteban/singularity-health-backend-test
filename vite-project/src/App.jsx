import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './formUser/CreateUser.jsx';
import VerificationEmail from './verificationEmail/verificationEmail.js';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/verificationEmail" element={<VerificationEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
