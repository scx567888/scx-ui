import {getFileNameByPath} from "../../utils";

const allModules = import.meta.globEager('./modules/**/*.js')
const modules = {}

for (const path in allModules) {
    let fileNameByPath = getFileNameByPath(path);
    modules[fileNameByPath] = allModules[path].default
}

export default modules
