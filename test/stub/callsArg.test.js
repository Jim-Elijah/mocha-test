const axios = require('axios');
const sinon = require('sinon');
const chai = require('chai');


const obj = {
    fn(...rest) {
        console.log('originalFn', ...rest);
    },
    delay() {
        return new Promise((resolve => {
            setTimeout(() => {
                console.log('resolve after 1s');
                resolve(1)
            }, 1000);
        }))
    }
}

describe("callsArg", function () {
    it("callsArg(1)", function () {
        const callback = sinon.stub();
        callback.callsArg(1)
        const res = callback(1, function () {
            return 2
        })
        chai.expect(res).to.equals(2);
        sinon.restore();
    });
    it("callsArg(3)", function () {
        const callback = sinon.stub();
        const fnStub = sinon.stub().callsFake((...rest) => {
            console.log('fnStub ret', ...rest);
            return 111
        })
        callback.callsArgWith(3, 'hello', 'world')

        const res = callback(1, 2, 3, fnStub)

        chai.expect(res).to.equals(111);
        sinon.assert.calledOnce(fnStub)
        sinon.restore();
    });
    it("originalFn", function () {
        const callback = sinon.stub(obj, 'fn');
        const fnStub = sinon.stub().callsFake((...rest) => {
            console.log('fnStub ret', ...rest);
            return 111
        })
        callback.callsArgWith(3, 'hello', 'world')

        const res = callback(1, 2, 3, fnStub)

        chai.expect(res).to.equals(111);
        sinon.assert.calledOnce(fnStub)
        sinon.restore();
    });
    it("delay", async function () {
        const delayStub = sinon.spy(obj, 'delay');

        console.time('delay time')
        // const clock = sinon.useFakeTimers()
        delayStub()
        // clock.tick(1000)
        console.timeEnd('delay time')

        sinon.restore();
    }).timeout(5 * 1000);
})