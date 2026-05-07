# Qguard — Sponsor Defense

## Anticipated Judge Questions

### Q1: "Why not just use ChatGPT/Claude API for this?"
**A**: Because the API call leaks your entire transaction history to OpenAI/Anthropic. The whole point is privacy. QVAC runs locally — the network monitor in the dashboard proves zero outbound packets during the entire demo.

### Q2: "How is RAG better than a simple database lookup?"
**A**: Database lookup is exact match only. RAG handles semantic queries: "Is this contract similar to the one that rugged DeFi Kingdom?" → retrieves related exploits by pattern, not just address. QVAC's RAG engine does this locally without API calls.

### Q3: "Is the risk score reliable?"
**A**: For the demo, yes — it's calibrated against known exploit patterns in the seed data. For production, it would need continuous model fine-tuning. We're honest about this limitation.

### Q4: "Why all 4 QVAC features instead of going deep on one?"
**A**: Because the rubric explicitly rewards breadth of SDK usage. More importantly, the features compound: OCR extracts receipt data → LLM validates against transaction → RAG checks contract safety → STT enables hands-free workflow. It's a security pipeline, not isolated tools.

### Q5: "What's the latency for local inference?"
**A**: See `scripts/bench.py` results. Expected: LLM ~1-2s, RAG ~500ms, OCR ~800ms, STT ~1s. All under the "instant" perception threshold for a security tool.
