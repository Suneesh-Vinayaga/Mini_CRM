from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/")
def add_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task.title,
        due_date=task.due_date,
        status=task.status
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"message": "Task added", "task": new_task}


@router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        return {"error": "Task not found"}
    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}
