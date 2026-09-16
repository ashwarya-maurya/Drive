const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const connectDB = require('./config/db');
connectDB();
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');   

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
  console.error('Request failed:', err);

  if (res.headersSent) {
    return next(err);
  }

  const isFileTooLarge = err.code === 'LIMIT_FILE_SIZE';
  const message = isFileTooLarge
    ? 'This file is too large. The maximum size is 50 MB.'
    : 'Something went wrong. Please retry.';
  const status = isFileTooLarge ? 413 : 500;

  if (req.get('accept')?.includes('application/json')) {
    return res.status(status).json({ message });
  }

  res.status(status).send(message);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
