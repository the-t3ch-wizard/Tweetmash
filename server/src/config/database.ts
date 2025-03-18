import mongoose from 'mongoose';
import { env } from './env';

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_CONNECTION_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;