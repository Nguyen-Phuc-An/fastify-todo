export const isAdmin = async (request, reply) => {
    if (request.user?.isAdmin !== 1) {
        return reply.status(403).send({ msg: 'Forbidden: Admins only' });
    }
};
