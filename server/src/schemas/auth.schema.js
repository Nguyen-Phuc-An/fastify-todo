export const registerBodySchema = {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
        username: { type: 'string', minLength: 1, maxLength: 100 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        isAdmin: { type: 'boolean', default: false }
    },
    additionalProperties: false
};

export const loginBodySchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
    additionalProperties: false
};