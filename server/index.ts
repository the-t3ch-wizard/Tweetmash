import express from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { asyncHandler, errorHandler, errorResponse, successResponse } from './src/lib/utils';
import { loggerMiddleware } from './src/middlewares/logger.middleware';
import rootRouter from './src/routes/index.routes';
import connectDB from './src/config/database';
import { env } from './src/config/env';
import './src/config/cronJobs';

const swaggerDocument = require('./src/docs/swagger-output.json');

const app = express();

app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:5173',
    env.FRONTEND_URL,
  ],
  credentials: true,
}))
app.use(cookieParser())

// middleware
app.use(loggerMiddleware)

// api to test server status
app.get('/', asyncHandler((req: any, res: any) => {
  return res.status(200).json(successResponse(200, "Req successful", { message: "Server is running fine" }))
}))

// all routes
app.use("/api/v1/", rootRouter);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.status(404).json(errorResponse(404, "Route Not Found"));
});

// error handler middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT || 7000, () => {
      console.log('The server is running locally on port 7000: http://localhost:7000');
      console.log('The api docs are available locally on port: http://localhost:7000/api-docs');
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
