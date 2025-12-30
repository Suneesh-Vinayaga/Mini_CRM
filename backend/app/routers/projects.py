from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.post("/")
def add_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    new_project = models.Project(
        name=project.name,
        description=project.description,
        client_id=project.client_id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return {"message": "Project added", "project": new_project}

@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        return {"error": "Project not found"}
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}
