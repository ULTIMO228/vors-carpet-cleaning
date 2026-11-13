# Ворс — магазин услуг чистки ковров

Учебный проект. Код бэкенда пишется вручную.

- `frontend/` — готовый макет (React + Vite), экспорт из Figma Make
- `backend/` — FastAPI + SQLAlchemy + MySQL
- `docs/` — заметки и план
- `docker-compose.yml` — MySQL для разработки

## Запуск БД
    docker compose up -d

## Запуск бэкенда
    cd backend
    python3 -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    cp .env.example .env
    uvicorn app.main:app --reload
