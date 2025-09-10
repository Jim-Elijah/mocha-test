const sinon = require('sinon')
const Util = require('../../src/Util');
const common = require('../../src/common')
const env = require("../../src/env")
const { expect } = require('chai');

describe('test Util with stub', () => {
    let util;
    beforeEach(() => {
        util = new Util();
    })
    afterEach(() => {
        util = null
        sinon.restore()
    })
    it("test add", function () {
        // 修改原有的add，令其返回10
        let add = sinon.stub(util, 'add').returns(10)
        const res = util.add(1);
        sinon.assert.callCount(add, 1);
        sinon.assert.calledOnce(add);
        sinon.assert.calledWith(add, 1)
        // count没有执行原有的add，因此值是0
        expect(util.count).eq(0)
        expect(res).eq(10)
        add.restore();
    })
    it("static", function () {
        const propertyStub = sinon.stub(Util, 'staticProperty').value('Stubbed value');
        const methodStub = sinon.stub(Util, 'staticFn').returns('Stubbed method');
        let result = Util.staticFn();
        expect(result).to.equal('Stubbed method')
        expect(Util.staticProperty).to.equal('Stubbed value')

        propertyStub.restore()
        methodStub.restore()

        result = Util.staticFn();
        expect(result).to.equal(undefined)
        expect(Util.staticProperty).to.equal('hello sinon')
    })
    it("static2", function () {
        class MyClass {
            static myStaticProperty = 'original value';
        }
        const stub = sinon.stub(MyClass, 'myStaticProperty').value('modified value');

        expect(MyClass.myStaticProperty).to.equal('modified value')

        stub.restore();

        expect(MyClass.myStaticProperty).to.equal('original value')
    })
    it("test fn1", function () {
        let fn1 = sinon.spy(util, 'fn1')
        let fn2 = sinon.stub(util, 'fn2')
        util.fn1();
        sinon.assert.calledOnce(fn1);
        sinon.assert.calledOnce(fn2);

        util.fn1();
        console.log('callCount', fn1.callCount, fn2.callCount);

        fn1.restore();
        fn2.restore();
    })
    it("test execCommand", async function () {
        let execCommandSpy = sinon.spy(util, 'execCommand')
        let promisifyExecStub = sinon.stub(common, 'promisifyExec')
        promisifyExecStub
            .withArgs('ls')
            .resolves('a')

        promisifyExecStub.resolves('b')


        expect(execCommandSpy).to.deep.equals(util.execCommand)
        expect(promisifyExecStub).to.deep.equals(common.promisifyExec)


        const res1 = await execCommandSpy('ls')
        expect(res1).to.equals('a')
        sinon.assert.calledOnce(execCommandSpy);
        sinon.assert.calledOnce(promisifyExecStub);
        expect(execCommandSpy.args[0][0]).to.equals('ls')
        expect(promisifyExecStub.args[0][0]).to.equals('ls')


        const res2 = await execCommandSpy('ls -a')
        expect(res2).to.equals('b')
        sinon.assert.calledTwice(execCommandSpy);
        sinon.assert.calledTwice(promisifyExecStub);
        expect(execCommandSpy.args[1][0]).to.equals('ls -a')
        expect(promisifyExecStub.args[1][0]).to.equals('ls -a')

        sinon.restore();
    })
    it("test execCommand-use original method", async function () {
        let execCommandSpy = sinon.spy(util, 'execCommand')
        let promisifyExecStub = sinon.stub(common, 'promisifyExec')
        promisifyExecStub
            .withArgs('ls')
            .resolves('a')

        promisifyExecStub.resolves('b')

        const res1 = await util.execCommand('ls')
        expect(res1).to.equals('a')
        sinon.assert.calledOnce(util.execCommand);
        sinon.assert.calledOnce(common.promisifyExec);
        expect(util.execCommand.args[0][0]).to.equals('ls')
        expect(common.promisifyExec.args[0][0]).to.equals('ls')


        const res2 = await util.execCommand('ls -a')
        expect(res2).to.equals('b')
        sinon.assert.calledTwice(util.execCommand);
        sinon.assert.calledTwice(common.promisifyExec);
        expect(util.execCommand.args[1][0]).to.equals('ls -a')
        expect(common.promisifyExec.args[1][0]).to.equals('ls -a')

        sinon.restore();
    })
    // it("test fn", function () {
    //     const fn1Stub = sinon.stub(util, 'fn1').callsFake(fn1)
    //     const fn2Spy = sinon.spy(fn2)
    //     function fn1() {
    //         console.log('fn1');
    //         fn2()
    //     }
    //     function fn2() {
    //         console.log('fn2');
    //     }
    //     // const spyFn1 = sinon.spy(fn1)
    //     // const spyFn2 = sinon.spy(fn2)  

    //     const log = sinon.spy(console, 'log')
    //     // sinon.replace(util, 'fn1', spyFn1)
    //     // sinon.replace(util, 'fn2', spyFn2)
    //     util.fn1();
    //     sinon.assert.calledOnce(fn1Stub);
    //     sinon.assert.calledOnce(fn2Spy);
    //     sinon.assert.callCount(log, 2);

    //     const logArgs = ['fn1', 'fn2']
    //     log.getCalls().forEach((call, index) => {
    //         console.log('index', index, logArgs[index]);
    //         sinon.assert.calledWith(log, logArgs[index])
    //     })

    // })
    // it("test fetch", function () {
    //     const param = {
    //         url: '',
    //         method: 'get',
    //         data: 'hello'
    //     }
    //     let fetch = sinon.stub()
    //     fetch.returns(param)
    //     sinon.replace(util, 'fetch', fetch)
    //     const res = util.fetch(param);
    //     console.log('res', res);
    //     sinon.assert.calledOnce(fetch);
    //     sinon.assert.calledWith(fetch, param)
    //     expect(res).to.equal(param)
    //     // fetch.restore();
    // })
    it("test getOS", function() {
        let isWinStub = sinon.stub(env, 'isWin').value("linux")
        let getOSSpy = sinon.spy(util, 'getOS');

        util.getOS()

        sinon.assert.callOrder(getOSSpy);
        expect(env.isWin).to.equals('linux')
    })
    it("decorate log", function() {
        let originalLog = console.log

        sinon.stub(console, 'log').callsFake((...args) => {
            originalLog("decorate log", ...args)
        })
        console.log('111');
        sinon.assert.calledOnce(console.log)
    })
});