import { Schema } from "mongoose";

const questionSchema = new Schema({
  option1: { type: String },
  option2: { type: String },
  question: { type: String },
});
const docSchema = new Schema({
  title: { type: String },
  desc: { type: String },
  price: { type: Number, default: 0 },
  img: { type: String, required: true },
  pageCount: { type: Number, required: true },
  published: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the "Admin" model
  rating: { type: Number, default: 0 }, // Floating-point number for rating
  purchaseCount: { type: Number, default: 0 }, // Integer for purchase count
  tLikes: { type: Number, default: 0 }, // Integer for like count
  type: {
    type: String,
    enum: ["notes", "paper", "presentation"],
    required: true,
  },
  testType: { type: String, enum: ["mst1", "mst2", "endSem"] },
  // university and course details
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  year: { type: Number, min: 2010, max: new Date().getFullYear() },
  semester: { type: Number, min: 1, max: 8 },
  university: { type: Schema.Types.ObjectId, ref: "Univ" },
  topics: [{ type: String }],
  subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  questions: {
    partA: [questionSchema],
    partB: [questionSchema],
  },
  // subject: { type: String, required: true },
  // subjectCode: { type: String, required: true },
});

// docSchema.virtual("departmentData", {
//   ref: "Department",
//   localField: "department",
//   foreignField: "_id",
//   justOne: true,
// });

// docSchema.virtual("courseData", {
//   ref: "Course",
//   localField: "course",
//   foreignField: "_id",
//   justOne: true,
// });

// docSchema.virtual("subjectData", {
//   ref: "Subject",
//   localField: "subject",
//   foreignField: "_id",
//   justOne: true,
// });

// docSchema.virtual("universityData", {
//   ref: "Univ",
//   localField: "university",
//   foreignField: "_id",
//   justOne: true,
// });

// docSchema.set("toObject", { virtuals: true });
// docSchema.set("toJSON", { virtuals: true });

export default docSchema;

//? for now we are using likedby to store the liked users
// for features such as showing users the people from their university or even class who liked the doc or purchased the doc we can either:
// 1. store the user details in likedBy and purchasedBy as an array of user ids
// 2. check every user from same university who purchased or liked the doc
