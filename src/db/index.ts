import mongoose from 'mongoose';

import addFieldsTransformer from './decorator/addFieldsTransformer';

// Global connection cache
let cachedDbConnection: typeof mongoose | null = null;

const connectDB = async () => {
  if (cachedDbConnection) {
    // Reuse the existing connection
    return cachedDbConnection;
  }

  const MONGO_URI = process.env.MONGO_URI || "";
  const MONGO_NAME = process.env.MONGO_NAME || "";

  try {
    if (!MONGO_URI) throw new Error("MONGO_URI is not defined!");
    if (!MONGO_NAME) throw new Error("MONGO_NAME is not defined!");

    // Create a new connection
    const connection = await mongoose.connect(MONGO_URI, {
      dbName: MONGO_NAME,
      bufferCommands: false, // Disable buffering
      socketTimeoutMS: 30000, // Increase timeout to 30 seconds
      serverSelectionTimeoutMS: 30000, // Timeout for selecting the server
    });

    // Cache the connection
    cachedDbConnection = connection;

    console.info(`>>> MongoDB Connected: ${connection.connection.host}`);

    return cachedDbConnection;
  } catch (error) {
    console.error(">>> Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// apply plugin to all schemas
mongoose.plugin(addFieldsTransformer);

export default connectDB;
