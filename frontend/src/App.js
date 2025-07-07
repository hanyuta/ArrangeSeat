import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import LoginPage from './components/pages/LoginPage/LoginPage';
import TopPage from './components/pages/TopPage/TopPage';

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
      {/* 保存ボタンをヘッダー直下に配置 */}
      <div style={{ padding: '8px 24px', background: '#f8f8f8', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '8px 20px',
            fontSize: 16,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
          }}
        >
          保存
        </button>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/top" element={<TopPage ref={topPageRef} />} />
      </Routes>
    </Router>
  );
}

export default App;
