import db from '../models/index.js';

export const initAdminAccount = async () => {
    try {
        // Dùng findOrCreate để tạo admin nếu chưa có
        const [admin, created] = await db.User.findOrCreate({
            where: { username: 'admin' },
            defaults: {
                username: 'admin',
                password: '$2b$12$w1l7ZIjpE2wn/Fi3glneieA4OdGSCPiZy30Ww9Xv9h6hVqesYf44K', // Mật khẩu đã mã hoá sẵn (admin123)
                email: 'admin@gmail.com',
                isAdmin: 1,
            },
        });

        if (created) {
            console.log('✅ Admin account created successfully!');
        } else {
            console.log('ℹ️ Admin account already exists.');
        }
    } catch (err) {
        console.error('❌ Failed to initialize admin account:', err.message);
    }
};
