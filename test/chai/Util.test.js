// import { after, before, it, describe, beforeEach, afterEach } from "mocha";
const chai = require('chai')
const Util = require('../../src/Util')

describe('test Util', () => {
    let util;
    beforeEach(() => {
        util = new Util();
    })
    afterEach(() => {
        util = null
    })
    it("test add", function () {
        chai.expect(util.count).equal(0);
        util.add()
        chai.expect(util.count).equal(1);
    })
    it("test substract", function () {
        chai.expect(util.count).equal(0);
        util.substract()
        chai.expect(util.count).equal(-1);
    })
});