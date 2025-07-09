import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import LoginPage from './components/pages/LoginPage/LoginPage';
import TopPage from './components/pages/TopPage/TopPage';
import SeatPositioningPage from './components/pages/SeatPositioningPage/SeatPositioningPage';

function App() {
  // TopPageのrefを作成
  const topPageRef = useRef();

  // 保存ボタン押下時の処理
  const handleSave = () => {
    if (topPageRef.current && topPageRef.current.saveBoxes) {
      topPageRef.current.saveBoxes();
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/top" element={<TopPage ref={topPageRef} />} />
        <Route path="/seat_positioning" element={<SeatPositioningPage />} />
      </Routes>
    </Router>
  );
}

export default App;
