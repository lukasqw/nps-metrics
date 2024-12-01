import { authMiddleware } from "@/middleware/authMiddleware";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  return authMiddleware(req);
}

export const config = {
  matcher: ["/protected/:path*"],
};
