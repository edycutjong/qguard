import { NextRequest, NextResponse } from "next/server";
import { TRANSACTIONS } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const txData = body.data || "";

  // Simulate QVAC LLM processing
  await new Promise((resolve) => setTimeout(resolve, 800));

  const match = TRANSACTIONS.find((t) => txData.includes(t.hash.slice(0, 6)));
  const risk = match?.risk ?? Math.floor(Math.random() * 40) + 50;

  return NextResponse.json({
    riskScore: risk,
    riskLevel: risk >= 80 ? "critical" : risk >= 60 ? "high" : risk >= 40 ? "medium" : "low",
    findings: match
      ? [match.reason]
      : [
          "Contract deployed less than 24 hours ago",
          "Deployer wallet funded by known Tornado Cash mixer",
          "Approval requested for unlimited token amount",
        ],
    recommendation:
      risk >= 80
        ? "DO NOT PROCEED. High probability of malicious contract."
        : risk >= 40
          ? "Exercise caution. Verify parameters before signing."
          : "Transaction appears safe based on known patterns.",
    engine: "QVAC.LLM",
    processingMode: "LOCAL",
    bytesTransmitted: 0,
  });
}
