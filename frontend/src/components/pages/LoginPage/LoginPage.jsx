import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    navigate('/top');
    // try {
    //   const res = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (res.ok) {
    //     navigate('/top');
    //   } else {
    //     const data = await res.json();
    //     setError(data.message || 'ログイン失敗');
    //   }
    // } catch (err) {
    //   console.error(err); 
    //   setError('通信エラー');
    // }
  };

  return (
    <div className="login-container">
      {/* ヘッダー */}


      {/* メインコンテンツ */}
      <main className="login-main">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-title">ログイン</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="example@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔒</span>
                パスワード
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="パスワードを入力"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button type="submit" className="login-button">
              <span className="button-icon">🚀</span>
              ログイン
            </button>
          </form>
        </div>
      </main>

      {/* 背景装飾 */}
      <div className="background-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </div>
  );
}

export default LoginPage; 