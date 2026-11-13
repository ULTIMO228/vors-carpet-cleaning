# План (ментор-режим: код пишешь сам)

## Домен (из макета frontend)
Услуги (цена за м²/шт), материалы (синтетика 290, шерсть 390, шёлк 590),
мастера (исполнители), корзина, заказ, доставка (390 ₽, бесплатно от 2500 ₽).

## Этапы
1. Hello FastAPI: `app/main.py`, `GET /health`, запуск через uvicorn.
2. Конфиг: `app/config.py` (pydantic-settings, читает .env).
3. БД: `app/db.py` (engine, SessionLocal, зависимость get_db), проверка соединения.
4. Модели: Service, Master, Order, OrderItem (SQLAlchemy 2.0).
5. Alembic: первая миграция, `alembic upgrade head`.
6. Схемы Pydantic + роутер `GET /services`, `GET /masters`.
7. Заказы: `POST /orders` (расчёт цены на сервере, а не из фронта).
8. Тесты pytest + httpx, подключение фронта (CORS).
