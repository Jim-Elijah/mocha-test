const { exec } = require('child_process')
const { EventEmitter} = require('events')
const { promisify } = require('util')

const promisifyExec = promisify(exec);

const log = (...args) => {
    console.log(...args);
}

const bus = new EventEmitter()

module.exports = {
    log,
    promisifyExec,
    bus,
}