export const createTodoBodySchema = {
    type: 'object',
    required: ['title'],
    properties: {
        title: { type: 'string', minLength: 1 },
        description: { type: ['string', 'null'] },
        dueDate: { type: ['string', 'null'], format: 'date-time' },
        isCompleted: { type: 'boolean', default: false }
    },
    additionalProperties: false
};