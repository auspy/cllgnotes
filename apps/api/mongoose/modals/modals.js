import { model } from "mongoose";
import userSchema from "../schemas/userSchema.js";
import docSchema from "../schemas/docSchema.js";
import adminSchema from "../schemas/adminSchema.js";

const User = model("User", userSchema);
const Docs = model("Docs", docSchema);
const Admin = model("Admin", adminSchema);

export { User, Docs, Admin };
