require('dotenv').config();
require('express-async-errors'); //instead of using unnecessary try and catch blocks
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');

//connectDB
const connect = require('./db/connect');

app.use(express.json());
// extra packages
app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
