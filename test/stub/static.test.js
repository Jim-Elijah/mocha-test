const sinon = require('sinon')
const chai = require('chai');
const TestStatic = require("../../src/static")

describe('stub TestStatic', () => {
    let instance
    beforeEach(() => {
        instance = new TestStatic()
        sinon.stub(TestStatic, 'staticProp').value(111)
    })
    afterEach(() => {
        sinon.restore();
    })
    it("staticProp", () => {
        chai.expect(TestStatic.staticProp).to.equals(111)
    })
    it("getStaticProp", () => {
        chai.expect(instance.getStaticProp()).to.equals(111)
    })
    it("this.value", () => {
        chai.expect(instance.value).to.equals(112)
        console.log('instance.value', instance.value);
    })
})