import { NextResponse } from "next/server";

/**
 PUBLIC_INTERFACE
 GET /api/health
 Returns a simple JSON object indicating the frontend is healthy.
*/
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
