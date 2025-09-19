#!/bin/bash
set -e

# === 1. Prep ===
cd /workspace
rm -rf naijatts_demo
git clone -b main https://github.com/Odiabackend099/odiadev-tts-naija-ai.git naijatts_demo
cd naijatts_demo

# === 2. Install dependencies (global, cached) ===
pip install --upgrade pip
pip install fastapi uvicorn

# === 3. Run server with auto-restart ===
while true; do
  echo "🚀 Starting NaijaTTS Demo Server..."
  python3 demo_server.py --host 0.0.0.0 --port 8890
  echo "❌ Server crashed. Restarting in 5s..."
  sleep 5
done
