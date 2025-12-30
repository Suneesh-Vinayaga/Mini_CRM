from sqlalchemy.orm import Session
from . import models, schemas

# ---------- Clients ----------
def create_client(db: Session, client: schemas.ClientCreate):
    db_client = models.Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def get_clients(db: Session):
    return db.query(models.Client).all()

def delete_client(db: Session, client_id: int):
    db_client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if db_client:
        db.delete(db_client)
        db.commit()
        return {"message": "Client deleted successfully"}
    return {"error": "Client not found"}


# ---------- Projects ----------
def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_projects(db: Session):
    return db.query(models.Project).all()


# ---------- FollowUps ----------
def create_followup(db: Session, followup: schemas.FollowUpCreate):
    db_followup = models.FollowUp(**followup.dict())
    db.add(db_followup)
    db.commit()
    db.refresh(db_followup)
    return db_followup

def get_followups(db: Session):
    return db.query(models.FollowUp).all()


# ---------- Tasks ----------
def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks(db: Session):
    return db.query(models.Task).all()
