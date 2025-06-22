import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        navigate('/top');
      } else {
        const data = await res.json();
        setError(data.message || 'ログイン失敗');
      }
    } catch (err) {
      setError('通信エラー');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">ログイン</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default LoginPage; 