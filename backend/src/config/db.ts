import mongoose from 'mongoose';

export interface DbConnectionStatus {
  isConnected: boolean;
  host?: string;
  name?: string;
  error?: string;
}

let connectionStatus: DbConnectionStatus = {
  isConnected: false,
};

export const connectDB = async (): Promise<DbConnectionStatus> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    const errorMsg = 'MONGODB_URI environment variable is not defined.';
    console.warn(`⚠️ Database Warning: ${errorMsg}`);
    connectionStatus = {
      isConnected: false,
      error: errorMsg,
    };
    return connectionStatus;
  }

  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    connectionStatus = {
      isConnected: true,
      host: conn.connection.host,
      name: conn.connection.name,
    };

    console.log(`✅ MongoDB Connected: ${conn.connection.host} [DB: ${conn.connection.name}]`);
    return connectionStatus;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Unknown MongoDB connection error';
    console.error(`❌ MongoDB Connection Error: ${errMessage}`);
    connectionStatus = {
      isConnected: false,
      error: errMessage,
    };
    return connectionStatus;
  }
};

export const getDbStatus = (): DbConnectionStatus => {
  const state = mongoose.connection.readyState;
  return {
    isConnected: state === 1,
    host: mongoose.connection.host || undefined,
    name: mongoose.connection.name || undefined,
    error: state === 1 ? undefined : connectionStatus.error || 'Database disconnected',
  };
};
