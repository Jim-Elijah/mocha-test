const sinon = require('sinon');
const axios = require('axios');


describe('xhr test', () => {
    // it('axios.get', function () {
    //     // 创建一个axios的stub
    //     const axiosStub = sinon.stub(axios, 'get');

    //     // 设置stub的行为
    //     axiosStub.withArgs('https://api.example.com/data')
    //         .returns(Promise.resolve({ data: 'Mocked data', msg: "ok" }));

    //     // 在测试中使用axiosStub来模拟axios的行为
    //     axios.get('https://api.example.com/data')
    //         .then(response => {
    //             console.log(response); // 输出: 'Mocked data'
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });

    //     // 恢复axios的原始实现
    //     axiosStub.restore();
    // })
    it('get', function () {
        // 创建一个axios的stub
        const axiosStub = sinon.stub(axios, 'get')
        console.log('axiosStub', axiosStub);
        axiosStub.returns(Promise.resolve({ data: 'axios fn', msg: "ok" }));

        // 设置stub的行为
        // axiosStub.withArgs('https://api.example.com/data1')
        //     .returns(Promise.resolve({ data: 'axios fn', msg: "ok" }));

        // 在测试中使用axiosStub来模拟axios的行为
        axios({
            url: 'https://api.example.com/data1',
            method: 'get'
        })
            .then(response => {
                console.log(response.data); // 输出: 'Mocked data'
            })
            .catch(error => {
                console.error(error);
            });

        // 恢复axios的原始实现
        axiosStub.restore();
    })
});
