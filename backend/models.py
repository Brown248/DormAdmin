from sqlalchemy import Column, Integer, String, Float, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# ตารางห้องพัก
class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True, index=True)
    dorm = Column(String)           # หอ A/B/C
    room_number = Column(String)    # หมายเลขห้อง เช่น A101
    price = Column(Float)           # ราคาห้อง
    status = Column(String)         # สถานะ: occupied/vacant/maintenance

    tenants = relationship("Tenant", back_populates="room")  # ความสัมพันธ์กับผู้เช่า

#ตารางผู้เช่า
class Tenant(Base):
    __tablename__ = "tenants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    room_id = Column(Integer, ForeignKey("rooms.id"))  # เชื่อมกับห้อง
    phone = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)
    paid = Column(Boolean, default=True)

    room = relationship("Room", back_populates="tenants")
