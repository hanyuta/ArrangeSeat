const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが違います' });
    }
    // 認証成功
    return res.status(200).json({ message: 'ログイン成功' });
  } catch (err) {
    console.error('LOGIN ERROR:', err, req.body);
    return res.status(500).json({ message: 'サーバーエラー' });
  }
});

module.exports = router; 