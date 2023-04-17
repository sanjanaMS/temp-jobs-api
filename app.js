require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const jobRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
const authUser = require('./middleware/authentication')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.use(express.json());
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}))
app.use(helmet())
app.use(xss())
app.use(cors())

// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authUser, jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
