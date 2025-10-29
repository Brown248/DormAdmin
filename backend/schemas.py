from pydantic import BaseModel
from datetime import date
from typing import Optional

#Room schema
class RoomBase(BaseModel):
    dorm: str
    room_number: str
    price: float
    status: str

class RoomCreate(RoomBase):
    pass

class Room(RoomBase):
    id: int
    class Config:
        orm_mode = True  # แปลง SQLAlchemy model เป็น JSON ได้

#Tenant schema
class TenantBase(BaseModel):
    name: str
    room_id: int
    phone: str
    start_date: date
    end_date: date
    paid: bool = True

class TenantCreate(TenantBase):
    pass

class Tenant(TenantBase):
    id: int
    class Config:
        orm_mode = True
