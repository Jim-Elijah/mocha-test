const sinon = require('sinon')
const chai = require("chai")
const events = require('events')
const Util = require('../../src/Util');
const common = require('../../src/common')

const { expect } = require('chai');

describe('test Util', () => {
    let util;
    beforeEach(() => {
        util = new Util();
        sinon.restore()
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
        let log = sinon.spy(console, 'log');
        util.fn1();
        sinon.assert.calledOnce(fn1);
        sinon.assert.calledOnce(fn2);
        sinon.assert.callCount(log, 3);

        const logArgs = ['fn1', 'fn2', 'fn1 end']
        log.getCalls().forEach((call, index) => {
            console.log('index', index, logArgs[index]);
            sinon.assert.calledWith(log, logArgs[index])
        });

        fn1.restore();
        fn2.restore();
        log.restore();
    })
    it("test fn1 call log", function () {
        // let fn1 = sinon.spy(util, 'fn1')
        console.log('common', common);
        let logSpy = sinon.spy(common, 'log')
        util.fn1();

        // sinon.assert.calledOnce(fn1)
        sinon.assert.calledOnce(logSpy)
        // sinon.assert.callOrder(fn1, logSpy)

        chai.expect(logSpy.getCall(0).args[0]).to.equals('fn1 end')

        // fn1.restore();
        logSpy.restore();
    })
    it("test fetch", async function () {
        let fetch = sinon.spy(util, 'fetch')
        const param = {
            url: '',
            method: 'get',
            data: 'hello'
        }
        const res = await util.fetch(param);
        sinon.assert.calledOnce(fetch); // 调用次数
        sinon.assert.calledWith(fetch, param) // 参数
        expect(res).to.equal(param) // 返回值

        fetch.restore();
    })
    it("busTest: mock bus", function () {
        let busMock = sinon.mock(common.bus)
        let busSpy = sinon.spy(util, 'testBus')

        busMock.expects('emit')
            .once()
            .withArgs("hello", "there")
        busMock.expects('on')
            .once()
            .withArgs("hello")

        util.testBus();

        sinon.assert.calledOnce(busSpy)

        busMock.verify()
    })
    it("busTest: mock EventEmitter", function () {
        let emiterMock = sinon.mock(events.EventEmitter)
        let busSpy = sinon.spy(util, 'testBus')

        emiterMock.expects('emit')
            .once()
            .withArgs("hello", "there")
            emiterMock.expects('on')
            .once()
            .withArgs("hello")

        util.testBus();

        sinon.assert.calledOnce(busSpy)

        emiterMock.verify()
    })
});