// import { NextResponse } from 'next/server';

// Define protected paths
// const protectedRoutes = ['/dashboard', '/profile', '/settings'];

// export function middleware(request) {
//   const isLoggedIn = request.cookies.get('token')?.value; // or session, or use headers

//   const path = request.nextUrl.pathname;

//   const isProtected = protectedRoutes.some((route) => path.startsWith(route));

//   if (isProtected && !isLoggedIn) {
//     const loginUrl = new URL('/sign-in', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/profile/:path*'],
// };