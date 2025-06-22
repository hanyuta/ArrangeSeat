import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';

function TopPage() {
  return <h2>トップページ</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/top" element={<TopPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
