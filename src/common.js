const { exec } = require('child_process')
const { promisify } = require('util')

const promisifyExec = promisify(exec);

const log = (...args) => {
    console.log(...args);
}

module.exports = {
    log,
    promisifyExec,
}