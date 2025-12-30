from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/clients", tags=["Clients"])

@router.post("/")
def add_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    return crud.create_client(db, client)

@router.get("/")
def fetch_clients(db: Session = Depends(get_db)):
    return crud.get_clients(db)

@router.delete("/{client_id}")
def remove_client(client_id: int, db: Session = Depends(get_db)):
    return crud.delete_client(db, client_id)
