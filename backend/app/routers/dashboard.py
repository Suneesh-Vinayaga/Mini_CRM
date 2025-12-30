from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def dashboard_stats(db: Session = Depends(get_db)):
    total_clients = db.query(models.Client).count()
    total_projects = db.query(models.Project).count()
    pending_tasks = db.query(models.Task).filter(models.Task.status == "pending").count()
    followups = db.query(models.FollowUp).count()

    return {
        "clients": total_clients,
        "projects": total_projects,
        "tasks": pending_tasks,
        "followups": followups
    }
