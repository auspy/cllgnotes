import { Schema } from "mongoose";

export const courseSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    fees: { type: Number },
    duration: { type: String },
    tags: [{ type: String }],
    eduType: {
      type: String,
      enum: ["UG", "PG", "Diploma", "Certificate", "PhD", "Other"],
    },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }], // subjects from all univs
    departId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
);
