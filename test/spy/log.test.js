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
    // it("test fn1", function () {
    //     let fn1 = sinon.spy(util, 'fn1')
    //     let fn2 = sinon.spy(util, 'fn2')
    //     let log = sinon.spy(console, 'log');
    //     util.fn1();
    //     sinon.assert.calledOnce(fn1);
    //     sinon.assert.calledOnce(fn2);
    //     sinon.assert.callCount(log, 3);

    //     // const logArgs = ['fn1', 'fn2', 'fn1 end']
    //     // log.getCalls().forEach((call, index) => {
    //     //     console.log('index', index, logArgs[index]);
    //     //     sinon.assert.calledWith(log, logArgs[index])
    //     // });

    //     fn1.restore();
    //     fn2.restore();
    //     log.restore();
    // })
    describe("remove log", () => {
        let logStub;
        beforeEach(() => {
            logStub = sinon.stub(console, 'log');
        })
        afterEach(() => {
            sinon.restore();
        })
        it('drop', () => {
            console.log('drop console.log');

            expect(logStub.called).to.be.true;
            sinon.assert.callCount(logStub, 1)
            console.log('===', logStub === console.log);
            console.log('args', logStub.args[0]);
            sinon.assert.callCount(logStub, 3)
        });
        it('util fn2', () => {
            util.fn2()
            expect(logStub.called).to.be.true;
            sinon.assert.callCount(logStub, 1)
            sinon.assert.calledWith(logStub, 'fn2')
            console.log('===', logStub === console.log);
            console.log('args', logStub.args[0]);
            sinon.assert.callCount(logStub, 3)
        });
    })
});