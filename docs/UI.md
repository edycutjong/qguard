# Qguard — UI Specification

## Design System
| Token | Value |
|---|---|
| **Primary** | Cyan (#06b6d4) — QVAC/Tether |
| **Danger** | Red (#ef4444) — High risk |
| **Warning** | Amber (#f59e0b) — Medium risk |
| **Success** | Green (#22c55e) — Low risk / OFFLINE badge |
| **Background** | Slate-950 (#020617) |
| **Surface** | Slate-900/80 backdrop-blur |
| **Typography** | JetBrains Mono (data), Inter (body) |
| **Aesthetic** | SOC Terminal / Air-Gapped Bunker |

## Pages

### 1. Dashboard (`/`)
- **Top Bar**: OFFLINE badge (green pulse), wallet address, total portfolio value
- **Left Panel**: Transaction list with risk-colored badges (🔴🟡🟢)
- **Center**: Active scanner output (LLM analysis results)
- **Right Panel**: RAG advisory feed, recent security alerts
- **Bottom Bar**: Microphone (STT), camera (OCR), network monitor

### 2. Scanner (`/scan`)
- Paste transaction hash input field
- LLM analysis output with risk gauge (0-100)
- Breakdown: contract age, approval type, historical patterns
- "Deep Scan" button for full RAG cross-reference

### 3. Receipt Matcher (`/receipts`)
- Drag-and-drop receipt image upload
- OCR extracted text preview (highlighted amounts/dates)
- Matched transaction card with confidence score
- "Confirm Match" button for reconciliation log

### 4. Voice Terminal (`/voice`)
- Large microphone button (hold-to-speak)
- Real-time transcription display
- Query results filtered below
- Voice history sidebar

## Key Components
| Component | Description |
|---|---|
| `RiskGauge` | Circular gauge 0-100 with color gradient |
| `OfflineBadge` | Pulsing green dot + "OFFLINE" text |
| `TransactionCard` | Hash, amount, risk badge, scan action |
| `OCRPreview` | Extracted text overlay on receipt image |
| `VoiceRecorder` | Animated waveform during recording |

## Animations
- Risk gauge: animated fill from 0 → final score
- OFFLINE badge: gentle green pulse every 3s
- Transaction scan: matrix-style text cascade during analysis
- Voice: waveform animation during STT recording
