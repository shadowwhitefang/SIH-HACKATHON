/**
 * MongoDB Connection and Lifecycle Configuration
 */

const mongoose = require('mongoose');

async function connectDB(customUri = null) {
  const uri = customUri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/civictrack';

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: true
    });

    if (process.env.NODE_ENV !== 'test') {
      // Clean, credential-free connection log
      console.log(`[CivicTrack DB] Connected successfully to host: ${conn.connection.host}`);
    }

    return conn.connection;
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(`[CivicTrack DB] Connection error: ${error.message}`);
    }
    throw error;
  }
}

async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

module.exports = {
  connectDB,
  disconnectDB
};
