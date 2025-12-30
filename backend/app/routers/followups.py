from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/followups", tags=["Follow Ups"])

@router.post("/")
def add_followup(data: schemas.FollowUpCreate, db: Session = Depends(get_db)):
    follow = models.FollowUp(
        note=data.note,
        date=data.date,
        client_id=data.client_id
    )
    db.add(follow)
    db.commit()
    db.refresh(follow)
    return follow

@router.get("/")
def get_followups(db: Session = Depends(get_db)):
    return db.query(models.FollowUp).all()

@router.delete("/{id}")
def delete_followup(id: int, db: Session = Depends(get_db)):
    follow = db.query(models.FollowUp).filter(models.FollowUp.id == id).first()
    if follow:
        db.delete(follow)
        db.commit()
    return {"message": "Follow up deleted"}
