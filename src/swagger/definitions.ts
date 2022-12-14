export default {
    User: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            _id: {
                type: 'string',
                description: 'An automatically generated id of the user'
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
                description: 'An array of user`s groups',
                additionalProperties: {
                    $ref: '#/definitions/Group'
                }
            }
        }
    },
    Group: {
        type: 'object',
        required: ['title'],
        properties: {
            _id: {
                type: 'string',
                description: 'An automatically generated id of the group'
            },
            title: {
                type: 'string',
                description: 'A title of the group'
            },
            tasks: {
                type: 'array',
                description: 'An array of group`s tasks',
                additionalProperties: {
                    $ref: '#/definitions/Task'
                }
            }
        }
    },
    Task: {
        type: 'object',
        required: ['title'],
        properties: {
            _id: {
                type: 'string',
                description: 'An automatically generated id of the task'
            },
            title: {
                type: 'string',
                description: 'A title of the task'
            },
            checked: {
                type: 'boolean',
                description: 'Shows the task is marked or not'
            },
            subtasks: {
                type: 'array',
                description: 'An array of task`s subtasks'
            }
        }
    }
}
