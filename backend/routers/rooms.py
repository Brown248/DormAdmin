from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 ดึงห้องทั้งหมด
@router.get("/", response_model=list[schemas.Room])
def get_rooms(db: Session = Depends(get_db)):
    return db.query(models.Room).all()

# 🔹 สร้างห้องใหม่
@router.post("/", response_model=schemas.Room)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    db_room = models.Room(**room.dict())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room
