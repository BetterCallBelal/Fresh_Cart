
import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast"

import Footer from "./_component/Footer/Footer";
import { Navbar } from "./_component/Navbar/Navbar";
import { Weight } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import MyProvider from "./_component/MyProvider/myprovider";
import Providers from "./_component/TanStackProvider/tanStackProvider";


const ExoFont = Exo({
  variable: "--font-Exo",
  weight : ['400' , '700' , '800']
});



export const metadata: Metadata = {
  title: "[FreshCart]",
  description: "You will find Whatever You Want!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ExoFont.className}`}
    >
      <body className="">
        
        <Providers>
        <MyProvider >
<Navbar/>
        
      
      {children}
       <Toaster />
      <Footer/>
      </MyProvider >
      </Providers>
      
      </body>
    </html>
  );
}
