from pydantic import BaseModel
from datetime import datetime

class ClientBase(BaseModel):
    name: str
    email: str | None = None
    phone: str | None = None
    company: str | None = None
    notes: str | None = None

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    name: str
    description: str
    client_id: int

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    class Config:
        from_attributes = True



class FollowUpBase(BaseModel):
    note: str
    date: datetime | None = None

class FollowUpCreate(FollowUpBase):
    client_id: int

class FollowUp(FollowUpBase):
    id: int
    client_id: int
    class Config:
        from_attributes = True


class TaskBase(BaseModel):
    title: str
    due_date: datetime | None = None
    status: str = "pending"

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    class Config:
        from_attributes = True
