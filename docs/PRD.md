# Qguard — Product Requirements Document

> **Emotional Hook**: A crypto native lost $47K because he approved a malicious token contract on his phone. A local AI running on his device could have flagged it in 200ms — but every "security" tool phones home to a cloud API, leaking exactly what it's supposed to protect.

## Problem Statement
Wallet security tools require cloud APIs that leak transaction data, addresses, and spending patterns. Users with serious holdings need transaction analysis, contract auditing, and receipt reconciliation — all running locally with zero cloud exposure.

## Solution Overview
Qguard is a local-first wallet security auditor powered by Tether's QVAC SDK. It runs LLM inference for transaction risk scoring, RAG for ingesting security advisories, OCR for receipt-to-transaction matching, and STT for voice-commanded wallet queries — all offline on a single laptop.

## Core Features (MVP)
1. **Transaction Risk Scanner (LLM)** — Paste a transaction → local LLM scores risk 0-100 with explanation
2. **Security Advisory RAG (RAG)** — Ingest known scam/exploit databases → query "Is contract 0x... safe?"
3. **Receipt Matcher (OCR)** — Photograph a purchase receipt → OCR extracts amount → matches to on-chain tx
4. **Voice Query (STT)** — "Show me all transactions over $1000 last week" → local speech-to-text → filtered view
5. **Air-Gapped Dashboard** — All processing local, network indicator shows "OFFLINE" badge

## Target Users
- Crypto power users with $50K+ portfolios
- Security-conscious DeFi traders
- Compliance officers doing manual transaction reconciliation

## Success Metrics
- All 4 QVAC features (LLM, RAG, OCR, STT) demonstrably running locally
- Transaction risk score generated in <2 seconds
- Receipt OCR matches to correct transaction
- Voice query returns correct filtered results
- Network monitor shows zero outbound API calls during processing

## Out of Scope
- ❌ Real wallet connection (use hardcoded demo wallet data)
- ❌ Live blockchain queries (pre-seeded transaction history)
- ❌ Custom model training
- ❌ Mobile app (desktop-only for QVAC)
