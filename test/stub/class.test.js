const sinon = require('sinon')
const chai = require('chai');
const fs = require("fs")

class Demo {
    static staticName = 'demo'
    static staticGreet() {
        return 'hello'
    }

}

class Container {
    constructor() {
        console.log('new Container');
    }
    contains(item) {
        /* ... */
    }
    greet() {
        console.log('hello');
    }
    write(path, data) {
        fs.writeFileSync(path, data)
    }
}

var stubContainer = sinon.createStubInstance(Container);
stubContainer.contains.returns(false);
stubContainer.contains.withArgs("item").returns(true)
describe('stub class', () => {
    it("修改static", function () {
        chai.expect(Demo.staticName).to.equals('demo');
        chai.expect(Demo.staticGreet()).to.equals('hello');

        Demo.staticName = 'jim'
        Demo.staticGreet = function () {
            return 'hello jim'
        }
        chai.expect(Demo.staticName).to.equals('jim');
        chai.expect(Demo.staticGreet()).to.equals('hello jim');

        sinon.restore();
    });
    // it("stub object", function () {
    //     var stubContainer = sinon.stub(new Container());
    //     stubContainer.contains
    //         .withArgs("item")
    //         .returns(true);
    //     stubContainer.contains.returns(false)
    //     chai.expect(stubContainer.contains()).to.equals(false)
    //     chai.expect(stubContainer.contains("item")).to.equals(true)

    //     const greetSpy = sinon.stub(stubContainer.greet).callsFake(() => {
    //         console.log('2222');
    //     })
    //     stubContainer.greet()
    //     sinon.assert.calledOnce(greetSpy)

    // })
    it('stub writeFileSync', function() {
        const instance = new Container()
        const wfsStub = sinon.stub(fs, 'writeFileSync').returns(1)
        const writeStub= sinon.spy(instance, 'write')

        instance.write('./1.txt', '111')

        sinon.assert.callOrder(writeStub, wfsStub)
        chai.expect(fs.writeFileSync('./1.txt', '111')).to.equals(1)
        chai.expect(wfsStub.getCall(0).args[0]).to.equals('./1.txt')
        chai.expect(wfsStub.getCall(0).args[1]).to.equals('111')
    })
    // it("createStubInstance", function () {
    //     var stubContainer = sinon.createStubInstance(Container);
    //     stubContainer.contains
    //         .withArgs("item")
    //         .returns(true);
    //     stubContainer.contains.returns(false)
    //     chai.expect(stubContainer.contains()).to.equals(false)
    //     chai.expect(stubContainer.contains("item")).to.equals(true)

    // })
})
