import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const ProtectedPages = [
    '/brands',
    '/Categories',
    '/FeaturedProducts',
    '/ProductDetails',
    '/Shop',
    '/wishlist',
    '/cart',
  ];
  const authPages = ['/register', '/login'];

  const pathName = req.nextUrl.pathname;

  const myToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });



  const isProtected = ProtectedPages.some((p) => pathName.startsWith(p));
  const isAuthPage = authPages.some((p) => pathName.startsWith(p));
console.log('secret exists?', !!process.env.NEXTAUTH_SECRET);
  if (!myToken && isProtected) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (myToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/brands/:path*',
    '/Categories/:path*',
    '/featuredproducts/:path*',
    '/productdetails/:path*',
    '/Shop/:path*',
    '/wishlist/:path*',
    '/register',
    '/login',
  ],
};