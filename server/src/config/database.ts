import mongoose from 'mongoose';
import { env } from './env';
import { initializeGlobalMetrics } from '../models/globalMetrics.model';

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_CONNECTION_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    await initializeGlobalMetrics();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;