const express = require('express');
const app = express();
const port = 8080;
const authRouter = require('./routes/auth');
const boxesRouter = require('./routes/boxes');

app.use(express.json());
app.use('/api', authRouter);
app.use('/api/boxes', boxesRouter);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
