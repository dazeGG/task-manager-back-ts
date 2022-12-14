import tags from './tags'
import paths from './paths'
import definitions from './definitions'

export default {
    swagger: '2.0',
    info: {
        title: 'Task Manager',
        version: '0.0.1',
        description: 'A Task Manager Express API',
    },
    host: 'taskmanager.daze.fun:1818',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags,
    paths,
    definitions
}
