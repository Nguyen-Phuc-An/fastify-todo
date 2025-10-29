// src/utils/parseFastifyError.js
export const parseFastifyError = (message) => {
  if (!message) return "Dữ liệu không hợp lệ";

  // BƯỚC 1: LẤY FIELD TỪ "body/email" hoặc "'email'"
  let rawField = null;

  // Trường hợp 1: "body/email must match format..."
  const bodyFieldMatch = message.match(/body\/([a-zA-Z]+)/);
  if (bodyFieldMatch) {
    rawField = bodyFieldMatch[1];
  }

  // Trường hợp 2: "must have required property 'username'"
  else if (message.includes("required property")) {
    const quotedMatch = message.match(/'([^']+)'/);
    if (quotedMatch) rawField = quotedMatch[1];
  }

  // BƯỚC 2: DỊCH FIELD → TIẾNG VIỆT
  const fieldVi = {
    username: "Tên đăng nhập",
    email: "Email",
    password: "Mật khẩu",
    title: "Tiêu đề",
    description: "Mô tả",
    dueDate: "Ngày đáo hạn",
    isCompleted: "Trạng thái hoàn thành"
  };
  const fieldName = rawField ? fieldVi[rawField] || rawField : "";

  // BƯỚC 3: DỊCH LỖI
  const errorMap = {
    "must have required property": `${fieldName} không được để trống`,
    "requires property": `${fieldName} không được để trống`,
    "must NOT have fewer than 6 characters": `${fieldName} phải có ít nhất 6 ký tự`,
    "must NOT have more than 100 characters": `${fieldName} không quá 100 ký tự`,
    "must match format \"email\"": `${fieldName} không hợp lệ`,
    "must be string": `${fieldName} phải là chuỗi`,
    "must be boolean": `${fieldName} phải là true/false`
  };

  for (const [en, vi] of Object.entries(errorMap)) {
    if (message.includes(en)) {
      return vi;
    }
  }

  return message; // fallback
};