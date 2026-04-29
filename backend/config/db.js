const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.log("Falling back to local in-memory MongoDB...");

    try {
      memoryServer = await MongoMemoryServer.create();
      const memoryUri = memoryServer.getUri();
      const memoryConnection = await mongoose.connect(memoryUri);
      console.log(
        `In-memory MongoDB connected: ${memoryConnection.connection.host}`
      );
    } catch (memoryError) {
      console.error(
        `In-memory MongoDB startup failed: ${memoryError.message}`
      );
      process.exit(1);
    }
  }
};

const shutdownMemoryServer = async () => {
  if (memoryServer) {
    await memoryServer.stop();
  }
};

process.on("SIGINT", async () => {
  await shutdownMemoryServer();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await shutdownMemoryServer();
  process.exit(0);
});

module.exports = connectDB;
