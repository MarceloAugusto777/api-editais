from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/attendance/punch")
async def punch():
    return {"ok": True}

