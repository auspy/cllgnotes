import { model } from "mongoose";
import userSchema from "../schemas/userSchema.js";
import docSchema from "../schemas/docSchema.js";
import { departmentSchema } from "../schemas/departSchema.js";
import { courseSchema } from "../schemas/courseSchema.js";
import { subjectSchema } from "../schemas/subjectSchema.js";
import { univSchema } from "../schemas/univSchema.js";
import commentSchema from "../schemas/commentSchema.js";
// import adminSchema from "../schemas/adminSchema.js";

const User = model("User", userSchema);
const Docs = model("Docs", docSchema);
const Department = model("Department", departmentSchema);
const Course = model("Course", courseSchema);
const Subject = model("Subject", subjectSchema);
const Univ = model("Univ", univSchema);
const Comment = model("Comment", commentSchema);

export { User, Docs, Department, Course, Subject, Univ, Comment };
