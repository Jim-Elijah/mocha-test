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
        let add = sinon.spy(util, 'add')
        util.add();
        sinon.assert.callCount(add, 1);
        sinon.assert.calledOnce(add);

        add.restore();
    })
    it("test add with step 3", function () {
        const step = 3
        let add = sinon.spy(util, 'add')
        util.add(step);
        sinon.assert.callCount(add, 1);
        sinon.assert.calledOnce(add);
        sinon.assert.calledWith(add, step);
        expect(util.count).eq(step)

        add.restore();
    })
    it("test substract with step '3'", function () {
        const step = '3'
        let add = sinon.spy(util, 'add')
        util.add(step);
        sinon.assert.callCount(add, 1);
        sinon.assert.calledOnce(add);
        sinon.assert.calledWith(add, step);
        expect(util.count).eq(Number(step))

        add.restore();
    })
    it("test fn1", function () {
        let fn1 = sinon.spy(util, 'fn1')
        let fn2 = sinon.spy(util, 'fn2')
        util.fn1();
        sinon.assert.calledOnce(fn1);
        sinon.assert.calledOnce(fn2);

        fn1.restore();
        fn2.restore();
    })
    it("test fetch", function () {
        let fetch = sinon.spy(util, 'fetch')
        const param = {
            url: '',
            method: 'get',
            data: 'hello'
        }
        util.fetch(param);
        sinon.assert.calledOnce(fetch);
        sinon.assert.calledWith(fetch, param)
        // sinon.assert.call(fetch, param)

        fetch.restore();
    })
});