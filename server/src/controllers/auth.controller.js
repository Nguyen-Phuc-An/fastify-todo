import * as authService from '../services/auth.service.js'
import { registerSchema, loginSchema } from '../validations/userValidation.js';
import { validateData } from '../validations/validation.js';

export const registerController = async (req, reply) => {

    const check = validateData(registerSchema, req.body);
    if (!check.valid) return reply.code(400).send({ err: 1, msg: check.msg });

    try {
        const response = await authService.registerService(check.data, true)
        return reply.code(response.err === 1 ? 400 : response.err === 2 ? 409 : 201).send(response);
    } catch (error) {
        return reply.code(500).send({
            err:-1,
            msg:'Failed at register controller: ' + error
        })
    }
}

export const loginController = async (req, reply) => {

    const check = validateData(loginSchema, req.body);
    if (!check.valid) return reply.code(400).send({ err: 1, msg: check.msg });

    try {
        const response = await authService.loginService(check.data, true)
        return reply.code(response.err ? 401 : 201).send(response);
    } catch (error) {
        return reply.code(500).send({
            err:-1,
            msg:'Failed at login controller: ' + error
        })
    }
}