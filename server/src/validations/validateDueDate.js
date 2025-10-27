// Hàm kiểm tra dueDate phải lớn hơn hoặc bằng thời gian hiện tại
export const validateDueDate = (dueDate) => {
    const currentDate = new Date(); // Thời gian hiện tại
    if (!dueDate || dueDate === "") {
        return { valid: true, msg: "" }; // Cho phép rỗng (null)
    }

    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
        return { valid: false, msg: "Ngày đáo hạn phải là ngày hợp lệ" };
    }

    if (dueDateObj < currentDate) {
        return { valid: false, msg: "Ngày đáo hạn phải lớn hơn hoặc bằng thời gian hiện tại" };
    }

    return { valid: true, msg: "" };
};