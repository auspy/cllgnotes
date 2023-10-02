import { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  purchasedDocs: [{ type: Schema.Types.ObjectId, ref: "Docs" }],
  role: { type: String, required: true },
  // // maybe later after testing we can add these fields as well
  // firstName: { type: String },
  // lastName: { type: String },
  // phone: { type: String },
  // // address related. this will be needed to maybe sell users data or show them ads. or to show universities from their area
  // address: { type: String },
  // city: { type: String },
  // state: { type: String },
  // zip: { type: String },
  // country: { type: String },
  // // university related. these info will only be needed when we have multiple universities
  // university: { type: String },
  // department: { type: String },
  // gradYear: { type: Number },
  // joinYear: { type: Number },
});

export default userSchema;
// we can maybe take info such as subjects or topics interested in and show only those docs to the user
