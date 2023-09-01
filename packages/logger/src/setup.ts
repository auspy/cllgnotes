import * as winston from "winston";
export const logger = winston.createLogger({
  format:
    process.env.NODE_ENV !== "production"
      ? winston.format.simple()
      : winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "logs/combined.log" }), // can be used to log to a file
  ],
});
export const log = (message: string) => {
  logger.info(message);
};
