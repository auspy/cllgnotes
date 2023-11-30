import * as winston from "winston";
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "logs/combined.log" }), // can be used to log to a file
  ],
});
export const log = (message: any) => {
  logger.info(JSON.stringify(message));
};
