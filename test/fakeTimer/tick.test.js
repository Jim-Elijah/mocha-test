const sinon = require('sinon');
const { expect } = require('chai');

// 异步函数
async function asyncFn() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('end');
}

describe('asyncFn', () => {
    afterEach(() => {
        sinon.restore()
    })
    it('should print "end" after 3s', async () => {

        let logSpy = sinon.spy(console, 'log')

        const clock = sinon.useFakeTimers();

        asyncFn();

        // 快进时间，跳过3s的等待
        clock.tick(4000);

        // 断言打印了 "end"
        // sinon.assert.calledOnce(logSpy)
        // sinon.assert.calledWith(logSpy, 'end');

        console.log('logSpy.calledOnce', logSpy.calledOnce);
        console.log('logSpy.getCall(0)', logSpy.getCall(0).args);
        expect(logSpy.calledOnce).to.be.true;
        // 断言console.log被调用参数为"end"
        // expect(logSpy.getCall(0).args[0]).to.be.true;
    });
});
