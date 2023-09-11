import { Schema } from "mongoose";

const docSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageLink: { type: String },
  published: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: "Admin" }, // Reference to the "Admin" model
  rating: { type: Number }, // Floating-point number for rating
  purchaseCount: { type: Number }, // Integer for purchase count
  likedBy: { type: Number }, // Integer for like count
  // university and course details
  course: { type: String },
  department: { type: String },
  year: { type: String },
  university: { type: String },
  topic: [{ type: String, required: true }],
  subject: { type: String, required: true },
  chapters: [{ type: String, required: true }], // a notes can be part of multiple units
});

export default docSchema;

//? for now we are using likedby to store the liked users
// for features such as showing users the people from their university or even class who liked the doc or purchased the doc we can either:
// 1. store the user details in likedBy and purchasedBy as an array of user ids
// 2. check every user from same university who purchased or liked the doc
