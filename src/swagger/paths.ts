import path from 'path'

import YAML from "yamljs"

export default {
    ...YAML.load(path.join(__dirname, '..', '..', 'swagger', 'paths', 'user.yaml')),
    ...YAML.load(path.join(__dirname, '..', '..', 'swagger', 'paths', 'group.yaml'))
}
