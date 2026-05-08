import { NextResponse } from "next/server";
import { TRANSACTIONS } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(TRANSACTIONS);
}
