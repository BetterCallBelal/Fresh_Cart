import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const formSchema = z.object({
   name: z
    .string()
    .nonempty('Name required')
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),

  phone: z
    .string()
    .nonempty('phone required')
    .regex(/^(010|011|012|015)\d{8}$/, "Phone must start with 010, 011, 012, or 015 and be 11 digits."),

  email: z
    .string()
    .nonempty('Email required')
    .email("Please enter a valid email address.")
    .min(5, "Email must be at least 5 characters.")
    .max(100, "Email must be at most 100 characters."),

  password: z
    .string()
     .nonempty('password required')
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),

  rePassword: z
    .string()
    .nonempty('Passwords do not match.')
    
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match.",
  path: ["rePassword"],
})