import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from './app/utils/jwt';

const AUTH_ROUTES = [ "/login", "/register" ];
// const PUBLIC_ROUTES = ["/", "/news", "/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news", ];
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("accessToken")?.value;

    const decodedToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).data as JwtPayload : null;

    let userRole = null;
    if(!decodedToken){
       cookieStore.delete("accessToken");
    
    return NextResponse.redirect(new URL('/login', request.url))
    }
    if(decodedToken?.success){
        userRole = decodedToken.data.role;
    }
    //user is logged in and trying to access login or register page
    if(accessToken && AUTH_ROUTES.includes(pathname)){
        if(userRole === "USER"){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }else if(userRole === "ADMIN"){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }else if(userRole === "AUTHOR"){
            return NextResponse.redirect(new URL('/author-dashboard', request.url))
        }else{
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname ===route || pathname.startsWith(route + "/"));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    // Authorized Pages Protection and Authentication is not handled yet
    if(!isPublicRoute && !isAuthRoute && !accessToken){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Authorized Pages Protection based on user role
    if(pathname === "/dashboard" && userRole !== "USER"){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }else if(pathname === "/admin-dashboard" && userRole !== "ADMIN"){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }else if(pathname === "/author-dashboard" && userRole !== "AUTHOR"){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }

    
//   return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next()
}
 
export const config = {
//   matcher: '/dashboard/:path*',
    matcher : [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}