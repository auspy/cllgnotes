import { model } from "mongoose";
import userSchema from "../schemas/userSchema.js";
import docSchema from "../schemas/docSchema.js";
// import adminSchema from "../schemas/adminSchema.js";

const User = model("User", userSchema);
const Docs = model("Docs", docSchema);
// Docs.createIndexes({
//   "questions.partA.question": "text",
//   "questions.partA.option1": "text",
//   "questions.partA.option2": "text",
//   "questions.partB.question": "text",
//   "questions.partB.option1": "text",
//   "questions.partB.option2": "text",
// });

// const Admin = model("Admin", adminSchema);

export { User, Docs };
