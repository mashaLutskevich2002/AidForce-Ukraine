const { normalize } = require("path");
const BASE_DIR = process.cwd();
const ENV_PATH = normalize(`${BASE_DIR}/../.env`)

module.exports = {
    BASE_DIR,
    ENV_PATH
};
