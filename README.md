# Mini CRM

A simple Mini CRM built for freelancers and creators to manage **clients, projects, tasks, and follow-ups** in one place.

---

## 📌 Features

- Add, view, and delete clients
- Create and manage projects linked to clients
- Task management with due date + status tracking
- Follow-ups scheduling for client communication history
- Dashboard with quick stats
- Backend: FastAPI + PostgreSQL  
- Frontend: React + Axios + Tailwind CSS

---

## 🏗 Tech Stack

| Layer      | Tools Used            |
|-----------|------------------------|
| Backend   | FastAPI, SQLAlchemy    |
| Database  | PostgreSQL             |
| Frontend  | React, Vite, Axios     |
| Styling   | Tailwind CSS           |

---

## 📁 Project Structure

project/
├── backend/
│ ├── app/
│ ├── routers/
│ ├── models.py
│ ├── schemas.py
│ └── main.py
├── frontend/
│ ├── src/pages/
│ ├── App.jsx
│ └── ...

yaml
Copy code

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend
bash
Copy code
cd frontend
npm install
npm run dev
🖥 Dashboard Preview

Copy code
📊 Clients Count
📁 Projects Count
📝 Pending Tasks
📅 Follow-ups Scheduled
Future Improvements
Authentication (Login system)

Email/SMS reminders for follow-ups

Export clients/projects as CSV

📬 Contribution
This is an open project. You can fork, improve and contribute.


yaml
Copy code

---

After adding it:

### Commit & push

```bash
git add README.md
git commit -m "Add complete README"
git push
