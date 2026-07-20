import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Protect dashboard and admin
  if ((isDashboardRoute(req) || isAdminRoute(req)) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (!userId) return;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const role = user.publicMetadata.role as string | undefined;

  // Only admins can access /admin
  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect logged-in users away from auth pages
  if (
    req.nextUrl.pathname === "/sign-in" ||
    req.nextUrl.pathname === "/sign-up"
  ) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin/dashboard" : "/dashboard", req.url),
    );
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
