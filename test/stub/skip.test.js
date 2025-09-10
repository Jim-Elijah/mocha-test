

const sinon = require('sinon')
const chai = require('chai');

class Skip {
    constructor() {
        this.count = 0
    }
    add(step) {
        this.count += Number(step) || 1
    }
    decrese(step) {
        this.count -= Number(step) || 1
    }
}
let instance
describe('stub usage', () => {
    beforeEach(() => {
        instance = new Skip()
    })
    afterEach(() => {
        sinon.restore();
    })
    // it("withArgs", function () {
    //     let addStub = sinon.stub(instance, 'add')
    //         .withArgs(2)
    //         .returns(0)
    //         .withArgs(3)
    //         .returns(3)
    //     addStub.callThrough()

    //     chai.expect(instance.count).to.equals(0);

    //     instance.add()
    //     console.log('instance.count1', instance.count);
    //     chai.expect(instance.count).to.equals(1);

    //     instance.add(2)
    //     chai.expect(instance.count).to.equals(3);

    //     instance.add(3)
    //     chai.expect(instance.count).to.equals(6);

    // });
    it("callThrough", function () {
        const obj = {
            sum(a, b) {
                return a + b;
            },
        };

        const sumStub = sinon
            .stub(obj, "sum")
            .withArgs(2, 2)
            .callsFake(function foo() {
                return "bar";
            });
        // sum的参数不是2，2时，执行原有的sum
        // 注意：ts此处标红
        obj.sum.callThrough();

        chai.expect(obj.sum(2, 2)).to.equals("bar");
        chai.expect(obj.sum(2, 3)).to.equals(5);
    })
})