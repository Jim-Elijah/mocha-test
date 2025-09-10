// const sinon = require('sinon')
// const chai = require('chai');
// const ssh = require("../../src/SSH")

// describe("connectSSH", function () {
//     // let client: ssh2.Client;
//     beforeEach(() => {
//         // client = runOnServerInstance.getClient();
//     })
//     it("connect test", async function () {
//         const server = {
//             name: "liche",
//             host: "192.168.253.65",
//             username: "root",
//             password: "1",
//             save2Dir: "",
//         }
//         let clock = sinon.useFakeTimers();
//         let connectSSHSpy = sinon.spy(ssh, 'connectSSH')
//         let getClientStub = sinon.stub(ssh, 'getClient').returns({
//             on: sinon.stub(),
//             connect: sinon.stub(),
//             ready: sinon.stub(),
//             error: sinon.stub(),
//             other: sinon.fake(),
//         })


//         let conn = ssh.getClient();
//         console.log('conn in test', conn);

//         await ssh.connectSSH(server)
//         await conn.on.withArgs('ready').yields();
//         chai.expect(conn.connect.calledOnce).to.be.true;
//         // sinon.assert.calledOnce(conn.connect)

//         sinon.assert.called(getClientStub)
//         const client = getClientStub.returnValues[0]
//         sinon.assert.callCount(client.on, 3)

//         // sinon.assert.calledOnce(connectSSHSpy)
//     })
// })