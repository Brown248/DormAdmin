from fastapi import FastAPI
from backend.routers import dashboard, rooms, tenants
from backend.database import engine
from backend import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 🔹 เชื่อมแต่ละ router เข้ากับระบบหลัก
app.include_router(dashboard.router)
app.include_router(rooms.router)
app.include_router(tenants.router)
