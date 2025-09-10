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
        let add = sinon.stub(util, 'add')
        add();
        sinon.assert.callCount(add, 1);
        sinon.assert.calledOnce(add);
        // sinon.assert.calledWith(add, 1);
        sinon.assert.returns(add, 10);
        add.restore();
    })
    it("test fn1", function () {
        const UtilStub = sinon.createStubInstance(Util);
        UtilStub.fn1();
        UtilStub.fn2();
        sinon.assert.calledOnce(UtilStub.fn1);
        sinon.assert.calledOnce(UtilStub.fn2);
    })
});