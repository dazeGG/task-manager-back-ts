import path from 'path'

import YAML from "yamljs"

export default {
    ...YAML.load(path.join(__dirname, '/user.yaml')),
    ...YAML.load(path.join(__dirname, '/group.yaml'))
}
