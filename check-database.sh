#!/bin/bash

echo "🔍 Проверяю базу данных..."
echo ""

echo "1️⃣ Проверяю, запущен ли контейнер:"
docker ps | grep telegram-bot-db
echo ""

echo "2️⃣ Проверяю, существует ли база данных telegram_bot:"
docker exec -it telegram-bot-db psql -U postgres -c "\l" | grep telegram_bot
echo ""

echo "3️⃣ Пытаюсь подключиться к базе данных:"
docker exec -it telegram-bot-db psql -U postgres -d telegram_bot -c "SELECT current_database();"
echo ""

echo "✅ Проверка завершена!"
