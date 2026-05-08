import { NextRequest, NextResponse } from "next/server";
import { ADVISORIES } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const query = (body.query || "").toLowerCase();

  // Simulate QVAC RAG processing
  await new Promise((resolve) => setTimeout(resolve, 400));

  const matches = ADVISORIES.filter(
    (a) =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      (a.contract && query.includes(a.contract.toLowerCase()))
  );

  return NextResponse.json({
    results: matches.length > 0 ? matches : ADVISORIES.slice(0, 3),
    confidence: matches.length > 0 ? 0.92 : 0.65,
    totalIndexed: 12847,
    engine: "QVAC.RAG",
    processingMode: "LOCAL",
    bytesTransmitted: 0,
  });
}
