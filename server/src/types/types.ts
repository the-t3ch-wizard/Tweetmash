import { NextFunction, Request, Response } from "express";
import { Document } from 'mongoose';

export interface Req extends Request {
  user?: {
    userId: string;
    name: string;
    email: string;
  };
}

export interface Res extends Response {
}

export interface Next extends NextFunction {
}

export interface IGlobalMetrics extends Document {
  dailyTweetCount: number;
  lastResetDate: Date;
  monthlyTweetCount: number;
  monthResetDate: Date;
  totalTweets: number;
  totalUsers: number;
  activeUsers: number;
  planDistribution: {
    free: number;
    pro: number;
    enterprise: number;
  };
  lastMaintenance?: Date;
  apiCallsToday: number;
  
  resetDailyCounts(): Promise<IGlobalMetrics>;
  resetMonthlyCounts(): Promise<IGlobalMetrics>;
}

