import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().max(100).required().messages({
        'string.empty': 'Username không được để trống',
        'any.required': 'Thiếu trường username'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email không hợp lệ',
        'any.required': 'Thiếu trường email'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
        'any.required': 'Thiếu trường password'
    }),
    isAdmin: Joi.boolean().default(false)
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không hợp lệ',
        'any.required': 'Thiếu trường email'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Mật khẩu không được để trống',
        'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
        'any.required': 'Thiếu trường password'
    })
});
