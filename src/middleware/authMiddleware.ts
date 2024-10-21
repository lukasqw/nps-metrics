import { NextRequest, NextResponse } from "next/server";

// Middleware function to check if the user is authenticated
export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");
  console.log("Token: ", token);

  // If the token is not present, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/pages/auth", req.url));
  }

  // If the token is present, allow the request to proceed
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: ["/protected/:path*"],
};
