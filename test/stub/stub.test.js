const sinon = require('sinon')
const chai = require('chai');

describe('stub usage', () => {
    it("withArgs和returns", function () {
        const callback = sinon.stub();
        callback.withArgs(1).returns(1);
        callback.returns(undefined);

        chai.expect(callback()).to.equals(undefined);
        chai.expect(callback(1)).to.equals(1);

        sinon.restore();
    });

    it("onCall", function () {
        const callback = sinon.stub();
        callback.onCall(0).returns(1);
        callback.onCall(1).returns(2);
        callback.returns(3);

        chai.expect(callback()).to.equals(1);
        chai.expect(callback()).to.equals(2);
        chai.expect(callback()).to.equals(3);

        sinon.restore();

    });

    it("连续调用行为定义方法会覆盖stub行为", function () {
        const callback = sinon.stub();
        callback.returns(0);
        chai.expect(callback()).to.equals(0);

        callback.returns(1);
        chai.expect(callback()).to.equals(1);

        sinon.restore();
    });

    it("onCall和withArgs结合", function () {
        const callback = sinon.stub();
        callback
            .withArgs(42)
            .onFirstCall()
            .returns(1)
            .onSecondCall()
            .returns(2);
        callback.returns(0);


        chai.expect(callback(1)).to.equals(0);
        chai.expect(callback(42)).to.equals(1);
        chai.expect(callback(42)).to.equals(2);
        chai.expect(callback(42)).to.equals(0);
        chai.expect(callback(1)).to.equals(0);
        chai.expect(callback(42)).to.equals(0);
    });

    it("onCall和withArgs结合-stub method", function () {
        const obj = {
            fn(a, b) {

            }
        }
        const callback = sinon.stub(obj, 'fn');
        /**
         * 参数42
         *     第一次调用，返回1；第二次调用，返回2
         * 其他情况
         *     第一次调用，返回111；其他的调用，返回0
         */
        callback
            .withArgs(42)
            .onFirstCall()
            .returns(1)
            .onSecondCall()
            .returns(2);
        callback
            .onFirstCall()
            .returns(111)
            .returns(0)


        chai.expect(obj.fn(1)).to.equals(111);
        chai.expect(obj.fn(42)).to.equals(1);
        chai.expect(obj.fn(42)).to.equals(2);
        chai.expect(obj.fn(42)).to.equals(0);
        chai.expect(obj.fn(1)).to.equals(0);
        chai.expect(obj.fn(42)).to.equals(0);
        chai.expect(callback.callCount).to.equals(6);
        console.log('callback.callCount', callback.callCount);
    });

    it("stub对象的方法-callsFake", function () {
        const obj = {
            fn: (a) => { }
        };
        const fn = sinon.stub(obj, 'fn').callsFake((a) => {
            return a;
        });

        chai.expect(obj.fn(1)).to.equals(1);
        chai.expect(obj.fn([])).to.deep.equals([]);
        sinon.restore();
        chai.expect(obj.fn(1)).to.equals(undefined);
    });

    it("resolves", async function () {
        const callback = sinon.stub();
        callback.resolvesArg(0);

        const res1 = await callback(1, 2);
        chai.expect(res1).to.equals(1);
        sinon.restore();
    });
    it("rejects", async function () {
        const callback = sinon.stub();
        callback.rejects(111);

        try {
            await callback();
        } catch (e) {
            chai.expect(e).to.equals(111)
        }
        sinon.restore();
    });
    it("throw", function () {
        const callback = sinon.stub();
        const obj = { name: 'throw exception' }
        callback.throws(obj);

        try {
            callback();
        } catch (e) {
            chai.expect(e).to.deep.equals(obj)
        }
        sinon.restore();
    });
    it("callArg", function () {
        const callback = sinon.stub();
        callback.callsArg(1)
        const res = callback(1, function () {
            return 2
        })
        chai.expect(res).to.equals(2);
        sinon.restore();
    });
    it("yields", function () {
        const callback = sinon.stub();
        const args = [1, 2, 3]
        callback.yields(...args)
        const res = callback(function () {
            return [...arguments]
        })
        chai.expect(res).to.deep.equals(args);
        sinon.restore();
    });
    it("yieldsTo", function () {
        const obj = {
            ajax({ success, fail }) {

            }
        }
        const args = [1, 2, 3]
        sinon.stub(obj, 'ajax').yieldsTo('success', args)
        obj.ajax({
            success(data) {
                chai.expect(data).to.deep.equals(args);
            }
        })
        sinon.restore();
    });
    // it("expectations", function () {
    //     var f1 = sinon.expectation.create().once();
    //     var f2 = sinon.expectation.create().once();
    //     console.log('f1', f1);
    //     var stub = sinon.stub().yield();
    //     stub(f1, f2);
    //     f1.verify();
    //     f2.verify();
    // })
    // it("yield-调用了回调", function () {
    //     const args = [1, 2, 3]
    //     const callback = sinon.stub()
    //     callback.yield(...args)
    //     const res = callback(function () {
    //         return [...arguments]
    //     })
    //     chai.expect(res).to.deep.equals(args);
    //     sinon.restore();
    // });
    // it("yield-没有调用回调", function () {
    //     const callback = sinon.stub();
    //     const args = [1, 2, 3]
    //     callback.yield(...args)
    //     const res = callback()
    //     chai.expect(res).to.deep.equals(args);
    //     sinon.restore();
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
        chai.expect(obj.sum(1, 2)).to.equals(3);
    });

    it("callThroughWithNew", function () {
        const obj = {
            Sum: function MyConstructor(a, b) {
                this.result = a + b;
            }
        };
        sinon
            .stub(obj, "Sum")
            // 注意：ts此处标红
            .callThroughWithNew()
            .withArgs(1, 2)
            .returns({ result: 9000 });

        chai.expect(new obj.Sum(2, 2)).to.deep.equals({ result: 4 });
        chai.expect(new obj.Sum(1, 2)).to.deep.equals({ result: 9000 });
    });
    it("get", function () {
        const obj = {
            name: "foo",
        };

        sinon.stub(obj, "name").get(function () {
            return "bar";
        });

        chai.expect(obj.name).to.equals("bar")
    });
    it("set", function () {
        const obj = {
            name: "foo",
            _age: 1,
            get age() {
                return this._age;
            }
        };

        sinon.stub(obj, "age").set(function (val) {
            obj._age = val + 1;
        });
        chai.expect(obj.age).to.equals(1)
        obj.age = 20
        chai.expect(obj.age).to.equals(21)
    });
    it("value", function () {
        const obj = {
            name: "foo",
        };
        sinon.stub(obj, "name").value("bar");
        chai.expect(obj.name).to.equals("bar")

        sinon.restore();
        chai.expect(obj.name).to.equals("foo")
    });
});