# Qguard — Seed Data

## Demo Wallet Transactions (20 entries)

### High Risk (Score 80-100)
```json
[
    {"hash": "0x1a2b...", "type": "approve", "token": "UNKNOWN-TOKEN", "amount": "unlimited", "to": "0xDEAD...", "risk": 94, "reason": "Unlimited approval to 2-hour-old contract"},
    {"hash": "0x3c4d...", "type": "swap", "token": "SOL→SCAM", "amount": "5000 SOL", "to": "pump.fun pool", "risk": 87, "reason": "Pool has 98% sell pressure, likely rug"},
    {"hash": "0x5e6f...", "type": "transfer", "token": "USDC", "amount": "25000", "to": "0xPHISH...", "risk": 82, "reason": "Destination matches known phishing address"}
]
```

### Medium Risk (Score 40-79)
```json
[
    {"hash": "0x7g8h...", "type": "swap", "token": "SOL→BONK", "amount": "100 SOL", "to": "Jupiter", "risk": 45, "reason": "High slippage (8%), consider lower amount"},
    {"hash": "0x9i0j...", "type": "stake", "token": "SOL", "amount": "500", "to": "Marinade", "risk": 35, "reason": "Established protocol, normal operation"}
]
```

### Low Risk (Score 0-39)
```json
[
    {"hash": "0xab1c...", "type": "transfer", "token": "USDC", "amount": "50", "to": "Known CEX", "risk": 5, "reason": "Transfer to verified Coinbase address"},
    {"hash": "0xcd2e...", "type": "swap", "token": "USDC→SOL", "amount": "1000", "to": "Jupiter", "risk": 12, "reason": "Standard swap on verified DEX"}
]
```

## RAG Security Advisory Database
```json
[
    {"source": "rekt.news", "contract": "0xDEAD...", "type": "rug_pull", "date": "2026-04-15", "loss": "$2.3M"},
    {"source": "community", "contract": "0xPHISH...", "type": "phishing", "date": "2026-05-01", "reports": 47},
    {"source": "certik", "contract": "0xSAFE...", "type": "audited", "date": "2026-03-20", "score": "A+"}
]
```

## OCR Receipt Samples
```
Receipt 1: "Starbucks | $4.75 | 2026-05-06 14:32" → matches tx 0xab1c
Receipt 2: "Hardware Wallet Co | $247.50 | 2026-05-05" → matches tx 0xcd2e
Receipt 3: "OTC Desk | 5,000 USDC | 2026-05-04" → matches tx 0x3c4d
```

## STT Voice Query Samples
```
"Show me all transactions over $1000" → filters 8 results
"What's my riskiest transaction this week?" → returns 0x1a2b (94/100)
"How much did I spend on gas today?" → calculates total fees
```
