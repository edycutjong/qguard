import { NextResponse } from "next/server";
import { RECEIPTS } from "@/lib/mock-data";

export async function POST() {
  // Simulate QVAC OCR processing
  await new Promise((resolve) => setTimeout(resolve, 600));

  const receipt = RECEIPTS[Math.floor(Math.random() * RECEIPTS.length)];

  return NextResponse.json({
    text: receipt.extractedText,
    amountFound: receipt.amount,
    vendor: receipt.vendor,
    matchedTx: receipt.matchedTxHash,
    confidence: receipt.confidence,
    engine: "QVAC.OCR",
    processingMode: "LOCAL",
    bytesTransmitted: 0,
  });
}
