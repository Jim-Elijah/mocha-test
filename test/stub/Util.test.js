const sinon = require('sinon')
const Util = require('../../src/Util');
const { expect } = require('chai');

describe('test Util', () => {
    let util;
    beforeEach(() => {
        util = new Util();
    })
    afterEach(() => {
        util = null
    })
    it("test add without step", function () {
        const UtilStub = sinon.createStubInstance(Util);
        let log = sinon.spy(console, 'log');
        UtilStub.fn1();
        UtilStub.fn2();
        sinon.assert.calledOnce(UtilStub.fn1);
        sinon.assert.calledOnce(UtilStub.fn2);
        sinon.assert.callCount(log, 2);
    })
});