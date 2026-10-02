'use server'
import { cookies } from 'next/headers';
 
 import * as z from "zod"

import { formSchema } from "@/app/SchemaS/RegisterSchema";
import { formSchemaL } from "@/app/SchemaS/LoginSchema";



export async function userRegister(data: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
        method:'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const payload= await response.json()
      console.log("payload" , payload);
      return response.ok
      
      
    } catch (error) {
      console.log('error');
      
    }
}
// export async function userLogin(data: z.infer<typeof formSchemaL>) {
//     try {
   

//       if (response.ok) {
//      const cookie =  await cookies()
//      cookie.set('UserToken' , payload.token,{
//       httpOnly : true,
//      }
    
//      )
//       } 
//       return response.ok
   
      
      
//     } catch (error) {
//       console.log('error');
      
//     }
// }
const BASE = "https://ecommerce.routemisr.com/api/v1/auth"


async function request(path: string, method: "POST" | "PUT", body: object) {
  try {
    const res = await fetch(`${BASE}/${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return { ok: res.ok, data }
  } catch {
    return { ok: false, data: { message: "Network error" } }
  }
}

export async function forgotPassword(email: string) {
  return request("forgotPasswords", "POST", { email })
}

export async function verifyResetCode(resetCode: string) {
  return request("verifyResetCode", "POST", { resetCode })
}

export async function resetPassword(email: string, newPassword: string) {
  return request("resetPassword", "PUT", { email, newPassword })
}