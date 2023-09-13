const sinon = require('sinon')
const chai = require("chai")
const Util = require('../../src/Util');
const common = require('../../src/common')

const { expect } = require('chai');

describe('test log', () => {
    let util;
    beforeEach(() => {
        util = new Util();
    })
    afterEach(() => {
        util = null
    })
    it("test fn1", function () {
        let fn1 = sinon.spy(util, 'fn1')
        let fn2 = sinon.spy(util, 'fn2')
        let log = sinon.spy(console, 'log');
        util.fn1();
        sinon.assert.calledOnce(fn1);
        sinon.assert.calledOnce(fn2);
        sinon.assert.callCount(log, 3);

        // const logArgs = ['fn1', 'fn2', 'fn1 end']
        // log.getCalls().forEach((call, index) => {
        //     console.log('index', index, logArgs[index]);
        //     sinon.assert.calledWith(log, logArgs[index])
        // });

        fn1.restore();
        fn2.restore();
        log.restore();
    })
});