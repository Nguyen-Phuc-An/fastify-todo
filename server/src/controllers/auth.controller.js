import * as authService from '../services/auth.service.js'

export const registerController = async (req, reply) => {
    try {
        const response = await authService.registerService(req.body, true)
        return reply.code(response.err === 1 ? 400 : response.err === 2 ? 409 : 201).send(response);
    } catch (error) {
        return reply.code(500).send({
            err:-1,
            msg:'Failed at register controller: ' + error
        })
    }
}

export const loginController = async (req, reply) => {
    try {
        const response = await authService.loginService(req.body, true)
        return reply.code(response.err ? 401 : 201).send(response);
    } catch (error) {
        return reply.code(500).send({
            err:-1,
            msg:'Failed at login controller: ' + error
        })
    }
}