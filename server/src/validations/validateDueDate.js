export const validateDueDate = (dueDate) => {
    const currentDate = new Date();
    if (!dueDate || dueDate === "") {
        return { valid: true, msg: "" }; // Cho phép rỗng
    }

    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
        return { valid: false, msg: "Ngày đáo hạn phải là ngày hợp lệ" };
    }

    // Chỉ so sánh phần ngày, bỏ qua giờ
    const currentYMD = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const dueYMD = new Date(dueDateObj.getFullYear(), dueDateObj.getMonth(), dueDateObj.getDate());

    if (dueYMD < currentYMD) {
        return { valid: false, msg: "Ngày đáo hạn phải lớn hơn hoặc bằng ngày hiện tại" };
    }

    return { valid: true, msg: "" };
};
