from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/face/enroll")
async def enroll():
    return {"ok": True}


@app.post("/face/verify")
async def verify():
    return {"match": True, "liveness": "placeholder"}

