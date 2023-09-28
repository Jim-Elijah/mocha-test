const { promisifySpawn } = require("./helper")

// const username = "zoujinqiang"
// const host = "192.168.253.220"

const username = "root"
const host = "192.168.253.65"

async function testPromisifySpawn() {
    const sshProcess = await promisifySpawn("ssh", ["-o", "StrictHostKeyChecking=no", `${username}@${host}`], null, (childProcess) => {
        setTimeout(() => {
            console.log('timeout');
            childProcess.emit("close", 0)
            childProcess.kill()
        }, 1 * 1000);
    });
    console.log('sshProcess', sshProcess);

    // promisifySpawn('ls', ['-l']).then(({ stdout, stderr }) => {
    //     console.log('stdout:', stdout);
    //     console.log('stderr:', stderr);
    //   }).catch((err) => {
    //     console.error('Error:', err);
    //   });
}
testPromisifySpawn();

