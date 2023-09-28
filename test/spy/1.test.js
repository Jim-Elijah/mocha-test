const sinon = require('sinon');

// 构造函数
class MyClass {
  // 构造函数逻辑
  prototypeMethod() {

  }
}

// 创建模拟构造函数
const mockConstructor = sinon.mock(MyClass);

// 设置期望行为
mockConstructor.expects('prototypeMethod').once().returns('mockedValue');

// 创建构造函数的实例
const instance = new MyClass('arg1', 'arg2');

// 获取实例上的方法并调用
const result = instance.prototypeMethod();

// 验证期望行为
mockConstructor.verify();

// 恢复模拟构造函数
mockConstructor.restore();