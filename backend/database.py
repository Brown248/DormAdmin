# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# -----------------------------------------------------
# 🧩 ตั้งค่าเชื่อมต่อฐานข้อมูล (SQLite)
# -----------------------------------------------------
SQLALCHEMY_DATABASE_URL = "sqlite:///./dorm.db"  # สร้างไฟล์ฐานข้อมูลชื่อ dorm.db ไว้ในโฟลเดอร์หลัก

# connect_args จำเป็นเฉพาะกับ SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# ตัวจัดการ Session (เปิดปิดการเชื่อมต่อ DB)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base สำหรับสร้างตารางใน models.py
Base = declarative_base()

# -----------------------------------------------------
# ⚙️ ฟังก์ชัน get_db() สำหรับ dependency injection
# -----------------------------------------------------
def get_db():
    """
    ฟังก์ชันนี้สร้าง session เชื่อมต่อฐานข้อมูล 1 ครั้งต่อ request
    และจะปิดเมื่อใช้งานเสร็จ (คล้าย context manager)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
