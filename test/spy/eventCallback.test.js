
const sinon = require('sinon')
const chai = require("chai")
const EventEmitter = require('events')

// const inner = () => {
//     console.log('inner');
// }

// const outter = () => {
//     console.log('outter');
//     inner()
// }

class Demo extends EventEmitter {
    callback(fn, ...args) {
        if (typeof fn === 'function') {
            fn(this.outter, ...args)
        }
    }
    outter(...args) {
        console.log('outter');
        this.inner(...args)
    }
    inner(...args) {
        console.log('inner', ...args);
    }
}

describe('test log', () => {
    let obj;
    beforeEach(() => {
        obj = new Demo()
    })
    afterEach(() => {
        sinon.restore()
    })
    it("spy callback", function () {
        const callbackSpy = sinon.spy(obj, 'callback')
        const outterSpy = sinon.spy(obj, 'outter')
        const innerSpy = sinon.spy(obj, 'inner')

        obj.on('change', (...args) => {
            console.log('event: change', ...args);
            obj.callback((...rest) => {
                console.log('cb', rest);
                const fn = rest.shift()
                fn.apply(obj, rest)
            }, ...args)
        })
        obj.emit('change', 1, 2, 3)

        sinon.assert.calledOnce(callbackSpy)
        sinon.assert.calledOnce(outterSpy)
        sinon.assert.calledOnce(innerSpy)
        sinon.assert.callOrder(callbackSpy, outterSpy, innerSpy)
    })
    // it("spy", function () {
    //     const outterSpy = sinon.spy(obj, 'outter')
    //     const innerSpy = sinon.spy(obj, 'inner')

    //     obj.outter()

    //     sinon.assert.calledOnce(outterSpy)
    //     sinon.assert.calledOnce(innerSpy)
    //     sinon.assert.callOrder(outterSpy, innerSpy)
    // })
    // it("stub", function () {
    //     const outterStub = sinon.stub(obj, 'outter').callsFake(() => { console.log('stubed outter'); })
    //     const innerSpy = sinon.spy(obj, 'inner')

    //     obj.outter()

    //     sinon.assert.calledOnce(outterStub)
    //     sinon.assert.notCalled(innerSpy)
    // })
})