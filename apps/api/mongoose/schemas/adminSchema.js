import { Schema } from "mongoose";

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdDocs: [{ type: Schema.Types.ObjectId, ref: "Docs" }],
});

export default adminSchema;
// will take only university mail as the mail for login but this will cause issues as user will lose mail access after graduation
