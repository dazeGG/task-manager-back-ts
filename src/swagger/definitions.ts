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
                    $ref: "#/definitions/Group"
                }
            }
        },
        example: {
            id: '635171cd473e21bb4c868446',
            username: 'vova',
            password: 'VovaPasss'
        },
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
                    $ref: "#/definitions/Task"
                }
            }
        },
        example: {
            id: '635171cd473e21bb4c868446',
            username: 'vova',
            password: 'VovaPasss'
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
            },
        },
        example: {
            id: '635171cd473e21bb4c868446',
            username: 'vova',
            password: 'VovaPasss'
        }
    }
}
