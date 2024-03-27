import { Types } from "mongoose";
import { z } from "zod";

export const zodMongoId = z.union([
  z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "something worong with object id",
  }),
  z.instanceof(Types.ObjectId).transform((id) => id.toString()),
]);
// z.string().refine((val) => {
//   return mongoose.Types.ObjectId.isValid(val);
// });
const commonString = z
  .string()
  .min(3, { message: "Must be 3 or more characters long" })
  .max(100, { message: "Must be 100 or less characters long" });
const commonNumber = z
  .number()
  .optional()
  .refine((n) => n === 0, { message: "Value must be 0" });
export const commonDoc = z.object({
  type: z.enum(["notes", "paper"]),
  published: z.boolean(),
  subject: commonString,
  subjectCode: z.string().min(4).max(30),
});
export const optionalProps = z
  .object({
    title: commonString,
    desc: z.string().min(3).max(250),
    price: commonNumber,
    testType: z.enum(["mst1", "mst2", "endSem", "other"]),
    course: commonString,
    department: z.string().min(3).max(120),
    semester: z.number().min(1).max(8),
    year: z.number().min(2010).max(2030),
    university: commonString,
    topics: z.array(commonString),
    units: z.array(commonString),
  })
  .partial();
export const zodPurchaseDoc = z.object({
  docId: zodMongoId,
  amount: commonNumber,
  payMethod: z.string().min(2).max(20),
});
export const zodUpdateDoc = z.object({
  id: zodMongoId,
  input: z.object({ ...commonDoc.shape, ...optionalProps.shape }).partial(),
});
export const zodFileUpload = z.object({
  filename: z
    .string()
    .regex(/^[a-zA-Z0-9_.-]*$/, {
      message:
        "Filename must contain only letters, numbers, underscores, dashes and dots",
    })
    .min(5)
    .max(100)
    .endsWith(".pdf"),
  mimetype: z.enum(["application/pdf"]),
  encoding: z.string().max(20),
  size: z.number().min(1).max(1000000).optional(),
  createReadStream: z.function(),
});
const createDocCommon = z.object({
  ...commonDoc.shape,
  ...optionalProps.shape,
});
export const zodCreateDocClient = z.object({
  input: z.object({
    ...createDocCommon.shape,
    img: z.object({
      name: zodFileUpload.shape.filename,
      size: zodFileUpload.shape.size,
      type: zodFileUpload.shape.mimetype,
      lastModified: z.number(),
      lastModifiedDate: z.date(),
      webkitRelativePath: z.string(),
    }),
  }),
});
export const zodCreateDoc = z.object({
  input: z.object({
    ...createDocCommon.shape,
  }),
});
// this is 100 length: "department of engineering and computer science specialization in data science nad artificial intelligence"
// input CreateDocInput {
//     title: String
//     desc: String
//     price: Float
//     img: Upload!
//     type: docType!
//     published: Boolean!
//     course: String
//     department: String
//     semester: Int
//     year: Int
//     university: String
//     topics: [String]
//     subject: String!
//     subjectCode: String!
//     units: [String]
//     testType: TestType
// }

export const zodContactForm = z.object({
  email: z.string().email().max(100).optional(),
  name: z.string().max(50).optional(),
  message: z.string().min(3).max(2000),
});
