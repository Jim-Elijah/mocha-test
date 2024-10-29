const axios = require('axios');
const sinon = require('sinon');


describe('axios stub', () => {
    it('test', () => {
        const axiosConfig = {
            method: 'get',
            url: 'http://192.168.253.220:9000/api/user',
            data: {
                firstName: 'Fred',
                lastName: 'Flintstone'
            }
        }
        // 创建 axios stub
        const axiosStub = sinon.stub(axios, 'get').resolves({ data: 'Mocked response' });
        // const axiosStub = sinon.stub(axios)
        // console.log('axiosStub', axiosStub);
            // .with
            // .resolves({ data: 'Mocked response' });

        // 调用 axios
        axios.get(axiosConfig).then(response => {
            console.log('data', response.data); // 在这里处理模拟的响应数据
        }).catch(error => {
            console.error('err', error); // 在这里处理模拟的错误
        });

        // 检查 axios stub 的调用情况
        sinon.assert.calledOnce(axiosStub);
        sinon.assert.calledWithExactly(axiosStub, axiosConfig);

        // 恢复原始的 axios.post 方法
        axiosStub.restore();
    })
})