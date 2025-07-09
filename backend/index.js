const express = require('express');
const app = express();
const port = 8080;
const authRouter = require('./routes/auth');

app.use(express.json());

// リクエストログ用のミドルウェア
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// デバッグ用のログ
console.log('Setting up routes...');

// テスト用の簡単なルート
app.post('/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Test route works!' });
});

// boxes.jsの読み込みをtry-catchで囲む（先に定義）
try {
  const boxesRouter = require('./routes/boxes');
  console.log('Boxes router loaded:', typeof boxesRouter);
  console.log('Boxes router stack:', boxesRouter.stack);
  app.use('/api/boxes', boxesRouter);
  console.log('Boxes route loaded successfully');
} catch (error) {
  console.error('Error loading boxes route:', error);
}

// より一般的な/apiルートは後で定義
app.use('/api', authRouter);
console.log('Auth routes loaded');

console.log('Routes set up complete');

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// デバッグ用のルート一覧表示
app.get('/debug/routes', (req, res) => {
  const routes = [];
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      routes.push(`${Object.keys(middleware.route.methods).join(',').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          routes.push(`${Object.keys(handler.route.methods).join(',').toUpperCase()} ${middleware.regexp.source}${handler.route.path}`);
        }
      });
    }
  });
  res.json(routes);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
