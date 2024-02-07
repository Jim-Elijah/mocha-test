const sinon = require('sinon');
const { expect } = require('chai');

class MyClass {
  constructor() {
    // 构造函数的逻辑
  }
}

describe('MyClass', () => {
  it('should call the constructor', () => {
    // 创建一个 spy 来跟踪构造函数的调用
    const constructorSpy = sinon.spy(MyClass.prototype, 'constructor');

    // 实例化 MyClass
    const myObj = new MyClass();

    // 断言构造函数被调用
    expect(constructorSpy.called).to.be.true;

    // 恢复原始的构造函数
    constructorSpy.restore();
    
  });
});