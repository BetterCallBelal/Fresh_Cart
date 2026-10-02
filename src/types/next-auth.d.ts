import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    token?: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    token?: string;
  }
}