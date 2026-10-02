import { decode } from 'next-auth/jwt';
import { cookies } from "next/headers"


export async function getTokenFun(){
const cookie =await cookies()
  const authToken =   cookie.get('next-auth.session-token')?.value
  const decodedToken = await decode({
    secret:process.env.NEXTAUTH_SECRET!,
    token:authToken
  })
 return decodedToken?.token
}