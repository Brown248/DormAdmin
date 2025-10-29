# backend/routers/dashboard.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

# ---------------------------------------------------------
# 🧩 ฟังก์ชัน: ดึงสรุปข้อมูล Dashboard
# ---------------------------------------------------------
@router.get("/summary")
def get_dashboard_summary(dorm: str = Query("all"), db: Session = Depends(get_db)):
    """
    ดึงข้อมูลสรุปห้องพัก เช่น จำนวนห้องทั้งหมด / มีผู้เช่า / ว่าง / ค้างชำระ
    สามารถเลือกเฉพาะหอ (A, B, C) หรือดูทั้งหมดได้
    """
    # ถ้าเลือกหอ -> กรองเฉพาะหอ
    query = db.query(models.Room)
    if dorm != "all":
        query = query.filter(models.Room.dorm_name == dorm)

    rooms = query.all()

    # คำนวณค่าต่าง ๆ
    total_rooms = len(rooms)
    occupied_rooms = sum(1 for r in rooms if r.is_occupied)
    vacant_rooms = total_rooms - occupied_rooms
    overdue_rooms = sum(1 for r in rooms if r.is_overdue)

    return {
        "dorm": dorm,
        "total_rooms": total_rooms,
        "occupied": occupied_rooms,
        "vacant": vacant_rooms,
        "overdue": overdue_rooms
    }


# ---------------------------------------------------------
# 🧾 ฟังก์ชัน: ดึงรายการห้องที่ค้างชำระ
# ---------------------------------------------------------
@router.get("/overdue")
def get_overdue_rooms(dorm: str = Query("all"), db: Session = Depends(get_db)):
    """
    ดึงรายการห้องที่ค้างชำระทั้งหมด (หรือเฉพาะหอ)
    """
    query = db.query(models.Room).filter(models.Room.is_overdue == True)
    if dorm != "all":
        query = query.filter(models.Room.dorm_name == dorm)

    overdue_list = []
    for room in query.all():
        tenant = (
            db.query(models.Tenant)
            .filter(models.Tenant.room_id == room.id)
            .first()
        )
        overdue_list.append({
            "room": room.room_number,
            "tenant_name": tenant.full_name if tenant else "-",
            "phone": tenant.phone if tenant else "-",
            "amount_due": room.overdue_amount,
            "dorm": room.dorm_name
        })

    return overdue_list
