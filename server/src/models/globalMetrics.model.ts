import { model, Schema } from "mongoose";
import { logger } from "../lib/logger";
import { IGlobalMetrics } from "../types/types";

const globalMetricsSchema = new Schema<IGlobalMetrics>({
  // Daily tweet metrics
  dailyTweetCount: {
    type: Number,
    default: 0,
  },
  lastResetDate: {
    type: Date,
    default: Date.now,
  },
  
  // Monthly tweet metrics
  monthlyTweetCount: {
    type: Number,
    default: 0,
  },
  monthResetDate: {
    type: Date,
    default: Date.now,
  },
  
  // All-time metrics
  totalTweets: {
    type: Number,
    default: 0,
  },
  
  // User statistics
  totalUsers: {
    type: Number,
    default: 0,
  },
  activeUsers: {
    type: Number,
    default: 0,
  },
  
  // Plan distribution
  planDistribution: {
    free: { type: Number, default: 0 },
    pro: { type: Number, default: 0 },
    enterprise: { type: Number, default: 0 },
  },
  
  // System health metrics
  lastMaintenance: {
    type: Date,
  },
  apiCallsToday: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Add a method to reset daily counts
globalMetricsSchema.methods.resetDailyCounts = async function(): Promise<IGlobalMetrics> {
  this.dailyTweetCount = 0;
  this.apiCallsToday = 0;
  this.lastResetDate = new Date();
  return this.save();
};

// Add a method to reset monthly counts
globalMetricsSchema.methods.resetMonthlyCounts = async function(): Promise<IGlobalMetrics> {
  this.monthlyTweetCount = 0;
  this.monthResetDate = new Date();
  return this.save();
};

export const GlobalMetrics = model<IGlobalMetrics>('GlobalMetrics', globalMetricsSchema);

// Initialize the global metrics document if it doesn't exist
export async function initializeGlobalMetrics() {
  const count = await GlobalMetrics.countDocuments();
  if (count === 0) {
    logger.info("create global metrics document");
    await GlobalMetrics.create({});
  }
}
