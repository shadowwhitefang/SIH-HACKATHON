/**
 * Server Bootstrap
 * Loads environment variables, establishes MongoDB connection, and starts the Express server.
 */

const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { connectDB, disconnectDB } = require('./config/database');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Start Express Server
    const server = app.listen(PORT, () => {
      console.log(`[CivicTrack Core Backend] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Graceful Shutdown
    const shutdown = async (signal) => {
      console.log(`\n[CivicTrack Server] Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        console.log('[CivicTrack Server] Database disconnected and server stopped.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    return server;
  } catch (error) {
    console.error('[CivicTrack Server] Fatal startup error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
