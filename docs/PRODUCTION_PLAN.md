# Qguard — Production Plan

## Deployment
| Component | Platform |
|---|---|
| Frontend | Vercel (static dashboard) |
| QVAC Runtime | Local machine (demo laptop) |
| Demo Data | Bundled JSON files |

## Verification Scripts
### `scripts/bench.py`
- LLM inference latency (p50/p95)
- RAG query latency (p50/p95)
- OCR extraction latency (p50/p95)
- STT transcription latency (p50/p95)

### `scripts/verify_offline.py`
- Verify QVAC SDK initialized
- Verify all 4 features respond
- Verify zero network calls during processing
- Verify seed data loaded

## Pre-Submission Checklist
- [ ] QVAC SDK installed and running locally
- [ ] LLM risk scoring works on 3 demo transactions
- [ ] RAG returns results for security queries
- [ ] OCR extracts text from receipt images
- [ ] STT transcribes voice queries
- [ ] Network monitor shows OFFLINE badge
- [ ] Demo video recorded (< 3 min)
- [ ] bench.py latency results included
- [ ] README with architecture diagram
