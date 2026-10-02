import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authoptions: NextAuthOptions = {
  providers: [
    Credentials({
      
      name: 'mylogin',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter Your Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Your password' },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: 'POST',
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { 'Content-Type': 'application/json' },
            }
          );

          const payload = await response.json();
          ;

          if (!response.ok) {
           
            return null;   
          }

          const UserData = jwtDecode<{ id: string }>(payload.token);
          

          return {
            id: UserData.id,
            email: payload.user.email,
            name: payload.user.name,
            token: payload.token,
          };
        } catch (error) {
          
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }

      
      return token;   
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      session.token = token.token as string;  
      return session;                            
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',   
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

