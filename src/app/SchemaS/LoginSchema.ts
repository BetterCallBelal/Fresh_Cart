import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const formSchemaL = z.object({


 

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


    
})
