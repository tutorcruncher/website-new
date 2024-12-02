import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function handlePricingRedirect(request: NextRequest) {
  try {
    const response = await fetch(`${process.env.HERMES_BASE_URL}/loc/`);

    const { country_code }: { country_code: string } = await response.json();
    const targetPath = `${request.nextUrl.pathname}/${country_code.toLowerCase()}`;

    return NextResponse.redirect(new URL(targetPath, request.url));
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.redirect(new URL("/pricing/gb", request.url));
  }
}
