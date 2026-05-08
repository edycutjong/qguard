import { NextResponse } from "next/server";
import { VOICE_QUERIES } from "@/lib/mock-data";

export async function POST() {
  // Simulate QVAC STT processing
  await new Promise((resolve) => setTimeout(resolve, 800));

  const query = VOICE_QUERIES[Math.floor(Math.random() * VOICE_QUERIES.length)];

  return NextResponse.json({
    transcript: query.transcript,
    parsedQuery: query.parsedQuery,
    resultCount: query.resultCount,
    engine: "QVAC.STT",
    processingMode: "LOCAL",
    bytesTransmitted: 0,
  });
}
