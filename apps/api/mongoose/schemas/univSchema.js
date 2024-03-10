import { Schema } from "mongoose";

export const univSchema = new Schema(
  {
    name: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);
