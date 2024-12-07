import { z } from "zod";

// action schemas

export const signUpSchema = z.object({
  username: z.string().min(3, "Minimum 3 characters").max(20, "Maximum 20 characters"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>

export const logInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LogInValues = z.infer<typeof logInSchema>

export const postSchema = z.object({
  title: z.string().min(3, "Minimum 3 characters"),
  content: z.string().optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Comment must contain at least 1 character"),
  post_id: z.string(),
})

// data schemas

export const profileSchema = z.object({
  username: z.string(),
  id: z.string()
})

export type ProfileData = z.infer<typeof profileSchema>