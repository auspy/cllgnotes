import { z } from "zod";
import { zodMongoId } from "./zod.doc.js";

export const zodComments = z.object({
  doc: z.string(),
  user: z.string(),
  x: z.number(),
  y: z.number(),
  page: z.number(),
  text: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const zodCommentInput = z.object({
  doc: zodMongoId,
  user: zodMongoId,
  x: z.number().max(10000),
  y: z.number().max(10000),
  page: z.number().max(20),
  text: z.string().max(500),
});
