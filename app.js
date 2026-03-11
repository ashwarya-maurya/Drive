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

app.set('view engine', 'ejs');
app.set('views', './views');   

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});