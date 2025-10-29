FROM node:22 AS dev

WORKDIR /usr/src/app

# Cài netcat để dùng nc
RUN apt-get update && apt-get install -y default-mysql-client

COPY package*.json ./
RUN npm install

# Copy source + .sequelizerc + script
COPY . .

EXPOSE 5000

# Cho phép script chạy
RUN chmod +x wait-for-db.sh

# Khi container start -> chờ DB rồi migrate -> start server
CMD ["sh", "./wait-for-db.sh"]
