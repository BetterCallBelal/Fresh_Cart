import * as z from "zod"

export const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
})

export const codeSchema = z.object({
  resetCode: z.string().min(1, "Code is required"),
})

export const newPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
})