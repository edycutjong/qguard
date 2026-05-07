# Qguard — Submission Materials

## Project Title
**Qguard** — Air-Gapped AI Wallet Security Auditor

## Short Description (150 chars)
Local-first wallet guardian using all 4 QVAC features: LLM risk scoring, RAG security advisories, OCR receipt matching, STT voice queries — zero cloud.

## Long Description (500 words)
Every crypto security tool has a dirty secret: it phones home. When you paste a suspicious transaction into a "security scanner," your wallet address, token balances, and transaction history are sent to a cloud API. The tool designed to protect you is the biggest leak.

**Qguard** eliminates this by running entirely on QVAC — Tether's local AI runtime. Four SDK features power a complete wallet security stack:

1. **LLM Transaction Risk Scanner**: Paste any transaction hash → QVAC's local LLM analyzes the contract interaction, token approvals, and historical patterns → outputs a 0-100 risk score with a human-readable explanation. "This contract was deployed 2 hours ago and requests unlimited token approval. Risk: 94/100."

2. **RAG Security Advisories**: QVAC's RAG engine ingests known scam databases, Rekt.news exploit reports, and community-reported phishing contracts. Ask "Is contract 0xABC safe?" and get grounded answers from real data — not hallucinations.

3. **OCR Receipt Matcher**: Photograph a purchase receipt (coffee shop, hardware wallet, OTC desk). QVAC's OCR extracts the amount and timestamp, then matches it to your on-chain transactions. Instant reconciliation for tax season.

4. **STT Voice Queries**: Press the mic and say "Show me all transactions over $1000 from last week." QVAC's speech-to-text converts your voice to a structured query, and the dashboard filters accordingly. Hands-free security auditing.

The key differentiator: a network monitor in the corner of the screen shows "OFFLINE" throughout the entire demo. Zero packets leave your machine. Your wallet data never touches a server.

### Why QVAC?
Any single feature could be built with a cloud API. But the combination of all four — running locally, in a single runtime, with shared context — is only possible with QVAC. The LLM knows what the RAG found. The OCR results feed into the LLM's analysis. The STT query understands the context of previous scans. This is compound intelligence, not isolated tools.

## Demo Video Script (2 min)
| Time | Scene | Narration |
|------|-------|-----------|
| 0:00 | Dashboard with OFFLINE badge | "Everything you see runs on your machine. Zero cloud." |
| 0:10 | Paste suspicious tx | "This contract was deployed 2 hours ago. Risk: 94/100." |
| 0:30 | Query RAG | "Is this contract safe? RAG: Flagged by 3 community reports." |
| 0:50 | Upload receipt photo | "OCR extracts $247.50 → matches to tx 0xABC from yesterday." |
| 1:10 | Voice query | "Show transactions over $1000" → filtered view appears |
| 1:30 | Network monitor | "Zero outbound packets. Your data never left this laptop." |
| 1:45 | Architecture slide | "4 QVAC features. 1 runtime. 0 cloud calls." |

## Track: Tether QVAC ($5,000 / $3,000 / $2,000)
