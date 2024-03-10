import { Schema } from "mongoose";

export const subjectSchema = new Schema(
  {
    name: { type: String, required: true },
    tags: [{ type: String }],
    code: { type: String, unique: true, required: true },
    category: { type: String },
    sem: { type: Number },
    elective: { type: Boolean },
    departId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);
