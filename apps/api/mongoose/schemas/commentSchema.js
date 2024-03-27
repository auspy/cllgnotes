import { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    doc: { type: Schema.Types.ObjectId, ref: "Docs", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    page: { type: Number, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default commentSchema;
