// const sinon = require('sinon');
// const fs = require('fs');
// const { expect } = require('chai');
// const stream = require('stream');

// function upload(sourceFilePath, destFilePath) {
//     const readStream = fs.createReadStream(sourceFilePath);
//     const writeStream = fs.createWriteStream(destFilePath);
//     readStream.pipe(writeStream);
// }

// describe('文件上传', () => {
//     it('应该正确地将readStream从源文件读取并将数据写入目标文件', () => {
//         let count = 0;
//         // 创建一个可读流（readStream）的模拟对象
//         const readStream = new stream.Readable({
//             read(size) {
//                 this.push('foo');
//                 if (count === 5) this.push(null);
//                 count++;
//             }
//         });

//         // 创建一个可写流（writeStream）的模拟对象
//         const writeStream = new stream.Writable();

//         // 创建一个用于存储写入数据的缓冲区
//         let dataBuffer = '';

//         // 为writeStream的write方法创建一个存根（stub）
//         const writeStub = sinon.stub(writeStream, 'write')
//             .callsFake((chunk, encoding, callback) => {
//                 dataBuffer += chunk;
//                 callback();
//             });

//         // let readBuffer = "", readSize = 0;
//         // const readStub = sinon.stub(readStream, 'read')
//         //     .callsFake((size) => {
//         //         readSize += size || 0;
//         //     });

//         // 模拟源文件和目标文件的路径
//         const sourceFilePath = 'path/to/source/file.txt';
//         const destFilePath = 'path/to/dest/file.txt';

//         // 创建一个用于存储源文件数据的缓冲区
//         const sourceFileData = 'Hello, World!';

//         // 为fs模块的createReadStream方法创建一个存根（stub）
//         const createReadStreamStub = sinon.stub(fs, 'createReadStream').returns(readStream);

//         // 为fs模块的createWriteStream方法创建一个存根（stub）
//         const createWriteStreamStub = sinon.stub(fs, 'createWriteStream').returns(writeStream);

//         // 将源文件数据写入readStream
//         // readStream.emit('data', sourceFileData)
//         // readStream.push(sourceFileData);
//         // // readStream.push(null); // 表示数据写入完成
//         // readStream.emit('end')

//         // 调用上传函数，将源文件数据从sourceFilePath复制到destFilePath
//         upload(sourceFilePath, destFilePath);

//         // 断言fs模块的createReadStream方法被正确调用
//         expect(createReadStreamStub.calledOnceWith(sourceFilePath)).to.be.true;

//         // 断言fs模块的createWriteStream方法被正确调用
//         expect(createWriteStreamStub.calledOnceWith(destFilePath)).to.be.true;

//         // 断言writeStream的write方法被正确调用，并且数据被正确写入
//         // expect(writeStub.callCount).to.equal(1);
//         // expect(dataBuffer).to.equal(sourceFileData);

//         // expect(readStub.callCount).to.equal(1);


//         // 恢复fs模块的createReadStream方法和createWriteStream方法的原始实现
//         createReadStreamStub.restore();
//         createWriteStreamStub.restore();
//     });
// });