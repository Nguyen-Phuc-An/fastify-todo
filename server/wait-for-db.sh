#!/bin/sh
set -e

DB_HOST_TO_USE=${DOCKER_DB_HOST:-$DB_HOST}
DB_PORT_TO_USE=${DOCKER_DB_PORT:-$DB_PORT}

# ✅ Kiểm tra biến môi trường
if [ -z "$DB_HOST_TO_USE" ] || [ -z "$DB_PORT_TO_USE" ]; then
    echo "❌ Lỗi: DB_HOST hoặc DB_PORT chưa được thiết lập!"
    echo "👉 Vui lòng kiểm tra lại docker-compose.yml hoặc file .env"
    exit 1
fi

echo "⏳ Đang chờ MySQL sẵn sàng tại $DB_HOST_TO_USE:$DB_PORT_TO_USE..."

# ✅ Chờ MySQL cho đến khi ping được
until mysqladmin ping -h"$DB_HOST_TO_USE" -P"$DB_PORT_TO_USE" --silent; do
    sleep 2
done

echo "✅ MySQL đã sẵn sàng! Tiến hành migrate..."
npx sequelize db:migrate --config ./src/config/config.js --migrations-path ./src/migrations

echo "🚀 Khởi động server..."
npm run dev
