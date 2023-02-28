import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

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

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => {
  connectMongo();
	console.log('server started.');
});
