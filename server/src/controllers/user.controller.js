import * as service from '../services/user.service.js';

export const getMeController = async (request, reply) => {
    try {
        const userId = request.user.id
        const result = await service.getCurrentUserService(userId);
        return reply.send(result);
    } catch (error) {
        return reply.status(500).send({
            err: -1,
            msg: 'Failed at get current user controller: ' + error.message
        });
    }
};