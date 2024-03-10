import { Schema } from "mongoose";

export const departmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

// departmentSchema.virtual("coursesData", {
//   ref: "Course",
//   localField: "courses",
//   foreignField: "_id",
// });
