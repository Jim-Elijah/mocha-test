const sinon = require('sinon')
const { expect } = require('chai');

class MyClass {
    static myStaticProperty = 'original value';
  }
  
  describe('MyClass', () => {
    it('should stub the static property', () => {
      const stub = sinon.stub(MyClass, 'myStaticProperty').value('stubbed value');
  
      // 断言静态属性被 stubbed
      expect(MyClass.myStaticProperty).to.equal('stubbed value');
  
      // 恢复原始的静态属性
      stub.restore();
  
      // 断言静态属性恢复为原始值
      expect(MyClass.myStaticProperty).to.equal('original value');
    });
  });