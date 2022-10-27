export default {
    User: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            _id: {
                type: 'string',
                description: 'An automatically generated id of the user',
            },
            username: {
                type: 'string',
                description: 'An user`s username'
            },
            password: {
                type: 'string',
                description: 'An user`s password'
            },
            groups: {
                type: 'array',
                additionalProperties: {
                    $ref: '#/definitions/Group'
                }
            }
        }
    },
    Group: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            _id: {
                type: 'string',
                description: 'An automatically generated id of the user',
            },
            tasks: {
                type: 'array',
                additionalProperties: {
                    $ref: '#/definitions/Task'
                }
            }
        }
    },
    Task: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            _id: {
                type: 'string',
                description: 'An automatically generated id of the user',
            },
            username: {
                type: 'string',
                description: 'An user`s username'
            },
            password: {
                type: 'string',
                description: 'An user`s password'
            }
        }
    }
}
