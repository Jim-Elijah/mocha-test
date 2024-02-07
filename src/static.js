class TestStatic {
    constructor() {
        this.value = TestStatic.staticProp + 1
    }
    static staticProp = 1
    static staticMethod() {

    }
    getStaticProp() {
        return TestStatic.staticProp
    }
}

module.exports = TestStatic 