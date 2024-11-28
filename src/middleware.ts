import { handlePricingRedirect } from "middlewares/pricing";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/pricing" ||
    request.nextUrl.pathname === "/pricing-calculator"
  ) {
    return await handlePricingRedirect(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pricing", "/pricing-calculator"],
};
