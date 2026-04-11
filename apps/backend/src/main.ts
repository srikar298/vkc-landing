import { bootstrapApp } from "./app";
import { config, logger } from "@vishwakarma-k-c/shared";

const start = async () => {
  const server = await bootstrapApp();

  try {
    const address = await server.listen({ 
      port: config.app.port, 
      host: "0.0.0.0" 
    });
    
    logger.info(`🚀 Backend Modular Monolith running on ${address}`);
    logger.info(`Environment: ${config.app.env}`);
  } catch (err) {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  }

  // Graceful Shutdown Handler
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`Received ${signal}, shutting down gracefully...`);
      
      try {
        await server.close();
        logger.info("Server closed successfully.");
        process.exit(0);
      } catch (err) {
        logger.error({ err }, "Error during shutdown");
        process.exit(1);
      }
    });
  });
};

start();
