import { authMiddleware } from "@/middleware/authMiddleware";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware: ", req.nextUrl.pathname);
  return authMiddleware(req);
}

export const config = {
  matcher: ["/protected/:path*"],
};
