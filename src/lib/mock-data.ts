// ─── Demo Wallet Transactions ─── //

export interface Transaction {
  hash: string;
  type: "approve" | "swap" | "transfer" | "stake" | "bridge";
  token: string;
  amount: string;
  to: string;
  risk: number;
  reason: string;
  timestamp: string;
  gasUsed: string;
}

export const TRANSACTIONS: Transaction[] = [
  // High Risk (80-100)
  { hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", type: "approve", token: "UNKNOWN-TOKEN", amount: "Unlimited", to: "0xDEAD...b4d1", risk: 94, reason: "Unlimited approval to 2-hour-old contract with hidden mint function", timestamp: "2026-05-08T06:12:00Z", gasUsed: "0.0034 ETH" },
  { hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d", type: "swap", token: "SOL → SCAM", amount: "5,000 SOL", to: "pump.fun pool", risk: 87, reason: "Pool has 98% sell pressure, deployer is a serial rugger", timestamp: "2026-05-08T05:45:00Z", gasUsed: "0.0089 SOL" },
  { hash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f", type: "transfer", token: "USDC", amount: "25,000", to: "0xPHISH...1b2c", risk: 82, reason: "Destination matches known phishing address from ScamSniffer DB", timestamp: "2026-05-08T04:30:00Z", gasUsed: "0.0021 ETH" },
  { hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b", type: "approve", token: "WETH", amount: "Unlimited", to: "0xDRAIN...e3f4", risk: 91, reason: "setApprovalForAll to contract flagged by 47 community reports", timestamp: "2026-05-08T03:15:00Z", gasUsed: "0.0028 ETH" },
  // Medium Risk (40-79)
  { hash: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d", type: "swap", token: "SOL → BONK", amount: "100 SOL", to: "Jupiter", risk: 45, reason: "High slippage (8.2%), consider reducing trade size", timestamp: "2026-05-08T02:00:00Z", gasUsed: "0.0045 SOL" },
  { hash: "0x0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e", type: "bridge", token: "ETH", amount: "2.5 ETH", to: "Arbitrum Bridge", risk: 52, reason: "Bridge contract updated 48hrs ago, verify new implementation", timestamp: "2026-05-07T22:30:00Z", gasUsed: "0.012 ETH" },
  { hash: "0x1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f", type: "stake", token: "SOL", amount: "500 SOL", to: "Marinade", risk: 35, reason: "Established protocol, normal staking operation", timestamp: "2026-05-07T20:15:00Z", gasUsed: "0.0015 SOL" },
  { hash: "0x2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a", type: "swap", token: "USDC → JUP", amount: "2,000 USDC", to: "Jupiter", risk: 40, reason: "Token price volatile (±15% 24h), proceed with caution", timestamp: "2026-05-07T18:00:00Z", gasUsed: "0.003 SOL" },
  // Low Risk (0-39)
  { hash: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b", type: "transfer", token: "USDC", amount: "50", to: "Coinbase (Verified)", risk: 5, reason: "Transfer to verified Coinbase cold storage address", timestamp: "2026-05-07T16:00:00Z", gasUsed: "0.0008 ETH" },
  { hash: "0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c", type: "swap", token: "USDC → SOL", amount: "1,000 USDC", to: "Jupiter", risk: 12, reason: "Standard swap on verified DEX with normal slippage", timestamp: "2026-05-07T14:30:00Z", gasUsed: "0.002 SOL" },
  { hash: "0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d", type: "transfer", token: "SOL", amount: "10 SOL", to: "Phantom (Self)", risk: 3, reason: "Self-transfer between known wallets", timestamp: "2026-05-07T12:00:00Z", gasUsed: "0.0005 SOL" },
  { hash: "0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e", type: "stake", token: "SOL", amount: "200 SOL", to: "Jito (Verified)", risk: 8, reason: "Established liquid staking protocol, audited by OtterSec", timestamp: "2026-05-07T10:00:00Z", gasUsed: "0.001 SOL" },
];

// ─── RAG Security Advisories ─── //

export interface Advisory {
  id: string;
  type: "ALERT" | "WARNING" | "INFO" | "CRITICAL";
  title: string;
  description: string;
  source: string;
  timestamp: string;
  contract?: string;
  loss?: string;
}

export const ADVISORIES: Advisory[] = [
  { id: "adv-001", type: "CRITICAL", title: "Active Wallet Drainer", description: "0x89...1b2 identified as active wallet drainer. 47 victims in 24h. Added to local blocklist. Pattern: setApprovalForAll() → transferFrom() drain.", source: "PeckShield", timestamp: "10m ago", contract: "0x89...1b2", loss: "$340K" },
  { id: "adv-002", type: "ALERT", title: "Permit2 Phishing Vector", description: "New attack vector: offline Permit2 signatures being harvested via fake Discord admin roles. Signed message drains entire token balance.", source: "ScamSniffer", timestamp: "34m ago" },
  { id: "adv-003", type: "WARNING", title: "Suspicious Bridge Activity", description: "Wormhole bridge contract on Arbitrum shows unusual admin key rotation. 3 new signers added in 6h. Monitor closely.", source: "rekt.news", timestamp: "1h ago" },
  { id: "adv-004", type: "INFO", title: "Threat DB Updated", description: "Ingested 1,402 new exploit signatures from PeckShield Q2 offline dump. Coverage: 12,847 known scam addresses.", source: "Local DB", timestamp: "3h ago" },
  { id: "adv-005", type: "ALERT", title: "Flash Loan Exploit Pattern", description: "New reentrancy variant detected in Curve-fork pools. Attack vector: price oracle manipulation via flash loan + nested callback.", source: "CertiK", timestamp: "5h ago", loss: "$2.1M" },
  { id: "adv-006", type: "INFO", title: "Safe Contract Verified", description: "Jupiter V6 router (JUP6...xyz) passes all security checks. Audit score: A+. Safe for unlimited approval.", source: "OtterSec", timestamp: "8h ago" },
];

// ─── OCR Receipt Samples ─── //

export interface Receipt {
  id: string;
  vendor: string;
  amount: number;
  currency: string;
  date: string;
  matchedTxHash: string | null;
  confidence: number;
  extractedText: string;
}

export const RECEIPTS: Receipt[] = [
  { id: "rcpt-001", vendor: "Starbucks Reserve", amount: 4.75, currency: "USD", date: "2026-05-06 14:32", matchedTxHash: "0x3a4b...2b3c", confidence: 0.97, extractedText: "STARBUCKS RESERVE\\n123 Main St\\nItem: Flat White\\nTotal: $4.75\\nDate: 05/06/2026 14:32" },
  { id: "rcpt-002", vendor: "Hardware Wallet Co", amount: 247.50, currency: "USD", date: "2026-05-05 09:15", matchedTxHash: "0x4b5c...3c4d", confidence: 0.94, extractedText: "HARDWARE WALLET CO\\nLedger Nano X\\nQty: 1\\nTotal: $247.50\\nDate: 05/05/2026" },
  { id: "rcpt-003", vendor: "OTC Desk Alpha", amount: 5000, currency: "USDC", date: "2026-05-04 16:00", matchedTxHash: "0x5e6f...3e4f", confidence: 0.89, extractedText: "OTC DESK ALPHA\\nInvoice #4821\\nAmount: 5,000 USDC\\nDate: 05/04/2026 16:00\\nRef: TRADE-8821" },
];

// ─── STT Voice Query Samples ─── //

export interface VoiceQuery {
  transcript: string;
  parsedQuery: string;
  resultCount: number;
  duration: string;
}

export const VOICE_QUERIES: VoiceQuery[] = [
  { transcript: "Show me all transactions over $1000", parsedQuery: "amount > 1000", resultCount: 5, duration: "1.2s" },
  { transcript: "What's my riskiest transaction this week?", parsedQuery: "ORDER BY risk DESC LIMIT 1", resultCount: 1, duration: "0.8s" },
  { transcript: "How much did I spend on gas today?", parsedQuery: "SUM(gas) WHERE date = today", resultCount: 4, duration: "1.1s" },
  { transcript: "Are there any critical alerts?", parsedQuery: "type = CRITICAL OR type = ALERT", resultCount: 3, duration: "0.6s" },
  { transcript: "Show transfers to unknown addresses", parsedQuery: "type = transfer AND to NOT IN verified_list", resultCount: 2, duration: "0.9s" },
];

// ─── Network Monitor ─── //

export interface NetworkStat {
  bytesOut: number;
  bytesIn: number;
  connections: number;
  blockedRequests: number;
  uptimeSeconds: number;
}

export const NETWORK_STATS: NetworkStat = {
  bytesOut: 0,
  bytesIn: 0,
  connections: 0,
  blockedRequests: 14,
  uptimeSeconds: 3847,
};

// ─── Portfolio Summary ─── //

export const PORTFOLIO = {
  totalValue: 124091.55,
  walletAddress: "0x742d...F4a8",
  tokens: [
    { symbol: "SOL", balance: 342.5, value: 58225.00 },
    { symbol: "USDC", balance: 35000, value: 35000.00 },
    { symbol: "ETH", balance: 8.2, value: 24600.00 },
    { symbol: "BONK", balance: 12500000, value: 3125.00 },
    { symbol: "JUP", balance: 4500, value: 3141.55 },
  ],
  riskDistribution: { high: 4, medium: 4, low: 4 },
};
