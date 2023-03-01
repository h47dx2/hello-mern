import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = '8800';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongodb.');
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).send(errorMessage)
})

app.listen(port, async () => {
  await connectMongo();
  console.log('server started.');
});
