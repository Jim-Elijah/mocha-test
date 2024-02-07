const sinon = require('sinon');
const axios = require('axios');
const chai = require('chai')
const fs = require('fs')
const path = require('path');

function downloadFile(url, dest) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(url, {
                responseType: "stream",
            });
            res.data.pipe(fs.createWriteStream(dest));
            res.data.on("end", () => {
                console.log("download vsix success");
                resolve(1);
            });
        } catch (e) {
            console.log("download vsix fail", e);
            reject(e);
        }
    });
}

describe('xhr test', () => {
    afterEach(() => {
        sinon.restore()
    })
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
    // it('get posts', async function () {
    //     const url = `https://jsonplaceholder.typicode.com/posts/1`
    //     sinon.spy(axios, 'get')

    //     const { data } = await axios.get(url)
    //     chai.expect(data.id).to.be.a('number')
    //     chai.expect(data.userId).to.be.a('number')
    //     chai.expect(data.title).to.be.a('string')
    //     chai.expect(data.body).to.be.a('string')

    // })
    // it('spy axios in downloadFile', async function () {
    //     const axiosSpy = sinon.spy(axios, 'get')
    //     const downSpy = sinon.spy(downloadFile)

    //     const url = `https://jsonplaceholder.typicode.com/posts/1`
    //     const filename = `${Math.random().toString().slice(-5)}.txt`
    //     const dest = path.join(__dirname, filename);

    //     chai.expect(axiosSpy).to.deep.equals(axios.get)
    //     // 注意：spy一个函数，得到 spy和原函数不相等；而spy对象的方法，得到的spy和方法相等
    //     // 以下断言 失败
    //     // chai.expect(downSpy).to.deep.equals(downloadFile)

    //     await downSpy(url, dest)

    //     sinon.assert.calledOnce(downSpy)
    //     sinon.assert.calledOnce(axiosSpy)
    //     sinon.assert.callOrder(downSpy, axiosSpy)
    //     chai.expect(fs.existsSync(dest)).to.be.true;
    //     // 删除保存在dest的测试文件
    //     fs.rmSync(dest)
    //     chai.expect(fs.existsSync(dest)).to.be.false;
    // })
    it('stub axios in downloadFile: success', async function () {
        const source = path.join(__dirname, '1.txt')
        if (!fs.existsSync(source)) {
            fs.writeFileSync(source, 'test downloadFile')
        }
        const axiosStub = sinon.stub(axios, 'get').resolves({
            data: fs.createReadStream(source)
        })
        // TODO fallsFake实现
        // callsFake(() => {
        //     return new Promise((resolve, reject) => {
        //         console.log('source', source);
        //         const rs = fs.createReadStream(source)
        //         rs.on('end', () => {
        //             console.log('stub axios get stream end');
        //             resolve({
        //                 data: rs
        //             });
        //         })
        //         rs.on('data', (data) => {
        //             console.log('stub axios get stream data', data.toString());
        //         })
        //     })
        // })
        const downSpy = sinon.spy(downloadFile)

        const url = `https://jsonplaceholder.typicode.com/posts/1`
        const filename = `${Math.random().toString().slice(-5)}.txt`
        const dest = path.join(__dirname, filename);

        chai.expect(axiosStub).to.deep.equals(axios.get)

        await downSpy(url, dest)

        sinon.assert.calledOnce(downSpy)
        sinon.assert.calledOnce(axiosStub)
        sinon.assert.callOrder(downSpy, axiosStub)
        chai.expect(fs.existsSync(dest)).to.be.true;
        // 删除为测试创建的文件
        fs.rmSync(dest)
        fs.rmSync(source)
        chai.expect(fs.existsSync(dest)).to.be.false;
    }).timeout(60 * 1000)
    it('stub axios in downloadFile: fail', async function () {
        const source = path.join(__dirname, '1.txt')
        const mockErrorMsg = "测试downloadFile: fail"
        const axiosStub = sinon.stub(axios, 'get').rejects(new Error(mockErrorMsg))
        const downSpy = sinon.spy(downloadFile)

        const url = `https://jsonplaceholder.typicode.com/posts/1`
        const filename = `${Math.random().toString().slice(-5)}.txt`
        const dest = path.join(__dirname, filename);

        // chai.expect(axiosStub).to.deep.equals(axios.get)

        try {
            await downSpy(url, dest)
        } catch (e) {
            chai.expect(e.message.toString()).to.equals(mockErrorMsg)
        } finally {
            sinon.assert.calledOnce(downSpy)
            sinon.assert.calledOnce(axiosStub)
            sinon.assert.callOrder(downSpy, axiosStub)
        }
    }).timeout(60 * 1000)
});
