const sinon = require('sinon')
const chai = require('chai');

class MyClass {
    constructor() {
        console.log('MyClass constructor');
        this.initialize();
        this.doSomething();
        this.finalize();
    }

    initialize() {
        // 初始化逻辑
        console.log('child initialize');
    }

    doSomething() {
        // 执行某些操作
        console.log('child doSomething');
    }

    finalize() {
        // 清理逻辑
        console.log('child finalize');
    }
}

describe('MyClass', () => {
    it('should call initialize, doSomething, and finalize in constructor', () => {
        let initializeCalled = false;
        let doSomethingCalled = false;
        let finalizeCalled = false;

        class MockMyClass extends MyClass {
            constructor(props) {
                super(props)
                console.log('constructor');
            }
            initialize() {
                initializeCalled = true;
                super.initialize();
            }

            doSomething() {
                doSomethingCalled = true;
            }

            finalize() {
                finalizeCalled = true;
            }
        }

        new MockMyClass();

        chai.expect(initializeCalled).to.be.true;
        chai.expect(doSomethingCalled).to.be.true;
        chai.expect(finalizeCalled).to.be.true;
    });
});
