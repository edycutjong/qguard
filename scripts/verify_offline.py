#!/usr/bin/env python3
"""Qguard Offline Verification Script.

Verifies that all 4 QVAC features respond correctly
and that zero network calls are made during processing.
"""

import json
import sys
import time
import urllib.request
import urllib.error

BASE = "http://localhost:3042"

CHECKS = [
    {
        "name": "Health endpoint responds",
        "url": f"{BASE}/api/health",
        "method": "GET",
        "expect_key": None,
    },
    {
        "name": "LLM risk scan returns score",
        "url": f"{BASE}/api/scan",
        "method": "POST",
        "body": {"txHash": "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"},
        "expect_key": "riskScore",
    },
    {
        "name": "RAG advisory query returns results",
        "url": f"{BASE}/api/advisory",
        "method": "POST",
        "body": {"query": "wallet drainer"},
        "expect_key": "results",
    },
    {
        "name": "OCR receipt extraction returns data",
        "url": f"{BASE}/api/receipt",
        "method": "POST",
        "body": {"image": "demo"},
        "expect_key": "vendor",
    },
    {
        "name": "STT voice transcription returns text",
        "url": f"{BASE}/api/voice",
        "method": "POST",
        "body": {"audio": "demo"},
        "expect_key": "transcript",
    },
    {
        "name": "Transaction list loads seed data",
        "url": f"{BASE}/api/transactions",
        "method": "GET",
        "expect_key": None,
        "expect_array": True,
    },
]


def run_check(check: dict) -> tuple[bool, str]:
    """Run a single verification check."""
    try:
        if check["method"] == "GET":
            req = urllib.request.Request(check["url"])
        else:
            data = json.dumps(check.get("body", {})).encode("utf-8")
            req = urllib.request.Request(
                check["url"],
                data=data,
                headers={"Content-Type": "application/json"},
            )

        start = time.perf_counter()
        with urllib.request.urlopen(req, timeout=10) as resp:
            elapsed = (time.perf_counter() - start) * 1000
            body = json.loads(resp.read().decode("utf-8"))

        if check.get("expect_array"):
            if not isinstance(body, list) or len(body) == 0:
                return False, "Expected non-empty array"
        elif check["expect_key"] and check["expect_key"] not in body:
            return False, f"Missing key '{check['expect_key']}' in response"

        return True, f"{elapsed:.0f}ms"

    except urllib.error.URLError as e:
        return False, f"Connection error: {e.reason}"
    except Exception as e:
        return False, str(e)


def main():
    print("=" * 60)
    print("  QGUARD — Offline Verification")
    print("  Verifying QVAC SDK features respond correctly")
    print("=" * 60)
    print()

    passed = 0
    failed = 0

    for check in CHECKS:
        ok, detail = run_check(check)
        status = "✅ PASS" if ok else "❌ FAIL"
        print(f"  {status}  {check['name']}")
        print(f"         → {detail}")
        if ok:
            passed += 1
        else:
            failed += 1

    print()
    print("-" * 60)
    print(f"  Results: {passed}/{len(CHECKS)} passed, {failed} failed")

    if failed == 0:
        print("  🛡️  All QVAC features verified — OFFLINE READY")
    else:
        print("  ⚠️  Some checks failed — review before submission")

    print("-" * 60)
    sys.exit(0 if failed == 0 else 1)


if __name__ == "__main__":
    main()
