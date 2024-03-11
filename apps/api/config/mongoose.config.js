// import mongoose from "mongoose";
// import dotenv from "dotenv";
// const env = process.env.NODE_ENV || "development";
// dotenv.config({ path: `.env.${env}` });
// // MONGOOSE
// const { connect, connection: mongoConn } = mongoose;
// const mongoConnect = connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   autoCreate: true,
// });

// mongoConn.on("connected", () => {
//   console.log("Mongoose connected to db");
// });

// mongoConn.on("error", (err) => {
//   console.error("connection error:", err);
// });
// export default mongoConn;
