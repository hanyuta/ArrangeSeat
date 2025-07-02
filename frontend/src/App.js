import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import LoginPage from './components/pages/LoginPage/LoginPage';
import TopPage from './components/pages/TopPage/TopPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/top" element={<TopPage />} />
      </Routes>
    </Router>
  );
}

export default App;
