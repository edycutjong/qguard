# Qguard — Build Plan (3-Day Sprint)

## Day 1: LLM + RAG (8 hours)
| Hour | Task | Deliverable |
|------|------|-------------|
| 0-1 | Scaffold + QVAC SDK setup | Next.js 16, Tailwind v4, QVAC initialized |
| 1-3 | LLM transaction scanner | Paste tx → risk score 0-100 + explanation |
| 3-5 | RAG security advisory | Ingest scam DB → query "Is 0x... safe?" |
| 5-7 | Dashboard layout | Dark terminal UI with scanner + advisory panels |
| 7-8 | Day 1 checkpoint | LLM + RAG working locally |

**Gate**: Can QVAC LLM score a transaction? If NO → check SDK version, fallback to prompt-only mode.

## Day 2: OCR + STT (8 hours)
| Hour | Task | Deliverable |
|------|------|-------------|
| 0-2 | OCR receipt matcher | Upload photo → extract amount → match to tx |
| 2-4 | STT voice query | Press mic → speak → filtered transaction view |
| 4-6 | Integration polish | All 4 features in unified dashboard |
| 6-8 | Network monitor | "OFFLINE" badge proving no outbound calls |

**Gate**: Do all 4 QVAC features work? If OCR/STT fail → document in limitations, focus on LLM+RAG depth.

## Day 3: Polish + Demo (8 hours)
| Hour | Task | Deliverable |
|------|------|-------------|
| 0-2 | UI polish | Glassmorphism cards, animations, responsive |
| 2-3 | Seed data | 20 demo transactions with varying risk levels |
| 3-4 | Demo rehearsal | Practice 4-feature walkthrough |
| 4-5 | Demo video | Record <3 min showing all 4 features |
| 5-6 | bench.py | Latency for each QVAC feature |
| 6-8 | README + submit | Architecture diagrams, screenshots |

## Must-Have ✅
- LLM transaction risk scoring (QVAC)
- RAG security advisory queries (QVAC)
- OCR receipt matching (QVAC)
- STT voice queries (QVAC)
- "OFFLINE" network badge
- Dark terminal UI

## Nice-to-Have 🟡
- Transaction history charts (Recharts)
- Risk heatmap visualization
- PDF security report export
