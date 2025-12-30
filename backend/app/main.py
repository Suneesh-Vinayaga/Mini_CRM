from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import clients, projects, tasks, followups, dashboard
from .database import engine, Base
from . import models

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mini CRM")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clients.router)
app.include_router(projects.router)
app.include_router(tasks.router)
app.include_router(followups.router)
app.include_router(dashboard.router)