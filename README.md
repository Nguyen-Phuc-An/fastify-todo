# 🧩 Fastify Todo App

## 📝 Mô tả
Ứng dụng **Todo List** được phát triển bằng **Fastify**, **MySQL**, và **React**.  
Cho phép người dùng quản lý công việc (task), đăng nhập bằng tài khoản admin, và cung cấp **API RESTful** để giao tiếp giữa frontend và backend.

Fastify được chọn vì hiệu năng cao, xử lý nhanh và dễ mở rộng. Ứng dụng phù hợp cho việc học, demo API, hoặc triển khai thực tế quy mô nhỏ.

---

## 🔐 Thông tin đăng nhập Admin

- **Email:** `admin@gmail.com`  
- **Password:** `admin123`

> ⚠️ *Lưu ý:* Đây là tài khoản mặc định chỉ dùng để **test và quản lý dữ liệu**, nên cần thay đổi mật khẩu khi deploy thật.

---

## ⚙️ Hướng dẫn cài đặt & chạy ứng dụng

### Tạo file môi trường `.env`
Tạo file `.env` trong thư mục **server** dựa theo mẫu có sẵn:

```bash
cp .env.example .env

### Thêm SECRET_KEY vào file môi trường `.env` (có hướng dẫn trong file .env.example)

### Build docker: gõ lệnh

```bash
docker compose up --build


