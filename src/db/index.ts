import mongoose from 'mongoose';

import addFieldsTransformer from './decorator/addFieldsTransformer';

const DB_CONNECTION_URI = process.env.MONGO_URI || "";
const DB_NAME = process.env.MONGO_NAME || "";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_CONNECTION_URI, {
      dbName: DB_NAME,
    });

    console.info(`>>> MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// apply plugin to all schemas
mongoose.plugin(addFieldsTransformer);

export default connectDB;
