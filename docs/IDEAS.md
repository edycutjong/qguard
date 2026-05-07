# 💡 Tether QVAC — Selected Idea

> **Decision**: Qguard (confirmed 2026-05-07)
> **Source**: Triple-convergence across all 3 models (DeepSeek R1, GLM, Gemini Deep Think)

---

## ✅ SELECTED: Qguard — Local AI Wallet Transaction Auditor

| Field | Value |
|-------|-------|
| **Name** | Qguard |
| **One-liner** | Air-gapped AI wallet guardian: scan transactions with local LLM, ingest security rules via RAG, OCR receipts for reconciliation, voice-command via STT — all offline, zero cloud leaks |
| **Target Track** | Primary: **Tether QVAC** ($5,000 / $3,000 / $2,000) |
| **Docs Distance** | 🟢 Novel — No existing "wallet security" example in QVAC docs |
| **Winner Archetype** | Capability-unlock — "Your wallet now has an air-gapped security officer" |
| **SDK Surface Area** | 4 features — LLM (tx analysis) + RAG (security rules) + OCR (receipt matching) + STT (voice commands) |
| **Production Plan** | Desktop Electron/web app, fully offline, zero cloud API calls |
| **Difficulty** | Medium (6-7/10) |
| **Tech Stack** | Next.js 16, QVAC SDK (LLM + RAG + OCR + STT), Supabase (local), Tailwind v4 |

---

## Gate Check

| Gate | Result |
|------|--------|
| ❌ Emotional Hook Test | ✅ PASS — "A DeFi farmer approved a malicious contract at 3am and lost $47,000 in 8 seconds — his antivirus saw nothing" |
| ❌ Docs Distance = 🔴 | ✅ PASS — 🟢 Novel, not a chatbot wrapper |
| ❌ Winner Archetype = Visualization only | ✅ PASS — Capability-unlock (local AI guards your wallet) |
| ❌ Scope = Wide+Shallow | ✅ PASS — ONE core flow: Paste tx hash → Local LLM flags risk → RAG cites rule → OCR verifies receipt → Voice alert |
| ❌ Rubric Alignment < 70% | ✅ PASS — Uses 4/4 QVAC features, privacy-first narrative |

---

## Why This Wins (Triple Convergence)

1. **ONLY triple-convergence archetype** — All 3 models independently placed wallet security as #1 or top-3
2. **4 QVAC features synergistically** — LLM + RAG + OCR + STT (not checkbox usage)
3. **"Why Local?" is answered instantly** — Wallet private keys + tx history = the MOST sensitive data. Cloud = leak vector
4. **Composite score 9.2/10** — highest averaged brutal honesty across models
5. **Low scope risk** — each feature is independent, can demo with 3/4 if one fails

## Runner-Up Ideas

| Rank | Idea | Score | Why Not |
|------|------|-------|---------|
| #2 | SeedVault (BIP-39 Whisperer) | 10.0/10 | Perfect score but only 3 features, too simple for 1st |
| #3 | VaultID (Zero-Leak KYC Oracle) | 9.5/10 | Strong but medium scope risk (KYC compliance is hard) |
