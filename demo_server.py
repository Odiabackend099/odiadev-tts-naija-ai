import os, argparse, uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/")
def root():
	return {"status": "ok", "message": "\ud83c\udf0d NaijaTTS Root Alive!"}

@app.get("/demo")
def demo():
	return HTMLResponse("<h1>\u2705 Fresh NaijaTTS Demo is running!</h1>")

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("--host", default="0.0.0.0")
	parser.add_argument("--port", type=int, default=8890)
	args = parser.parse_args()

	pod_id = os.environ.get("RUNPOD_POD_ID", "unknownpod")
	print("\ud83d\udc96 NaijaTTS Demo Server Starting...")
	print(f"\ud83d\udcbb Local: http://localhost:{args.port}/demo")
	print(f"\ud83c\udf0d Proxy: https://{pod_id}-8888.proxy.runpod.net/proxy/{args.port}/demo")

	uvicorn.run("demo_server:app", host=args.host, port=args.port, reload=False)
