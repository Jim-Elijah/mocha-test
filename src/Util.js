const common = require('./common')

class Util {
    static staticProperty = 'hello sinon'
    static staticFn() {

    }
    constructor() {
        this.count = 0;
    }
    add(step) {
        this.count += Number(step) || 1;
    }
    substract(step) {
        this.count -= Number(step) || 1;
    }
    fetch(param) {
        return Promise.resolve(param)
    }
    fn1() {
        console.log('fn1');
        this.fn2()
        common.log('fn1 end')
    }
    fn2() {
        console.log('fn2');
    }
    execCommand(cmd, options) {
        return common.promisifyExec(cmd, options)
    }
}

module.exports = Util;