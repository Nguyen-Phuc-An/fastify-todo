import db from '../models/index.js'

export const getCurrentUserService  = async (userId) => {
    try {
        const user = await db.User.findByPk(userId, 
            {
                attributes: { exclude: ['password'] }
            }
        );

        return {
            err: user ? 0 : 1,
            msg: user ? 'Get user info successfully' : 'User not found',
            user
        }
    } catch (error) {
        throw error
    }
}

export const getAllUsersService  = async () => {
    try {
        const response = await db.User.findAndCountAll({
            raw: true,
            nested: true,
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'Get all users successfully!' : 'Get all users failed!',
            response
        }
    } catch (error) {
        throw error
    }
}