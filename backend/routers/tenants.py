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

#ดึงผู้เช่าทั้งหมด
@router.get("/", response_model=list[schemas.Tenant])
def get_tenants(db: Session = Depends(get_db)):
    return db.query(models.Tenant).all()

# สร้างผู้เช่าใหม่
@router.post("/", response_model=schemas.Tenant)
def create_tenant(tenant: schemas.TenantCreate, db: Session = Depends(get_db)):
    db_tenant = models.Tenant(**tenant.dict())
    db.add(db_tenant)
    db.commit()
    db.refresh(db_tenant)
    return db_tenant
