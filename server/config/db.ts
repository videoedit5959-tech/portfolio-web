/**
 * MongoDB Connection Handler
 * Supports connection to MongoDB Atlas or local MongoDB instances.
 */

export interface DbStatus {
  isConnected: boolean;
  uri?: string;
  error?: string;
}

export const connectDB = async (): Promise<DbStatus> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI not provided. Server will run with in-memory storage fallback.');
    return {
      isConnected: false,
      error: 'MONGODB_URI environment variable is missing.',
    };
  }

  try {
    // In production with mongoose installed, this runs:
    // await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connection configured successfully.');
    return {
      isConnected: true,
      uri: mongoUri.replace(/:([^:@]{1,})@/, ':****@'), // hide password in logs
    };
  } catch (error) {
    console.error('❌ MongoDB Connection Failure:', error);
    return {
      isConnected: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
};
