const chai = require('chai')
const sinon = require('sinon');
const Util = require('../../src/Util');

let util;
describe('test Util', () => {
    before(() => {
        console.log('util before');
    })
    after(() => {
        console.log('util after');
    })
    beforeEach(() => {
        console.log('util beforeEach');
        util = new Util();
    })
    afterEach(() => {
        console.log('util afterEach');
        util = null;
    })
    it("test add without step", function () {
        let add = sinon.stub(util, 'add').returns(10)
        util.add();
        sinon.assert.calledOnce(add);
        chai.expect(util.count).to.equals(0)
        sinon.restore();
    })
    it("test add without step 3", function () {
        let add = sinon.spy(util, 'add')
        util.add(3);
        sinon.assert.calledOnce(add);
        chai.expect(util.count).to.equals(3)

        sinon.restore();
    })
    it("test add without step 4", function () {
        let add = sinon.spy(util, 'add')
        util.add(4);
        sinon.assert.calledOnce(add);
        chai.expect(util.count).to.equals(4)
    })
    describe("other", () => {
        before(() => {
            console.log('other before');
        })
        after(() => {
            console.log('other after');
        })
        beforeEach(() => {
            console.log('other beforeEach');
            util = new Util();
        })
        afterEach(() => {
            console.log('other afterEach');
            util = null;
        })
        it("1+1", function() {
            chai.expect(1+1).to.equals(2)
        })
    })
})