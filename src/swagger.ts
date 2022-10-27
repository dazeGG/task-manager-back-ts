import path from 'path'

import YAML from "yamljs"

const tags = YAML.load(path.join(__dirname, '..', 'swagger', 'tags.yaml'))
const components = YAML.load(path.join(__dirname, '..', 'swagger', 'components.yaml'))

export default {
    openapi: '3.0.0',
    info: {
        title: 'Task Manager',
        version: 'v1',
        description: 'A Task Manager Express API',
    },
    host: 'taskmanager.daze.fun:1818',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags,
    components,
    paths: {
        ...YAML.load(path.join(__dirname, '..', 'swagger', 'paths', 'user.yaml')),
        ...YAML.load(path.join(__dirname, '..', 'swagger', 'paths', 'group.yaml'))
    }
}
