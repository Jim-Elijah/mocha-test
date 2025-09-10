const ssh = require('ssh2')
const { Client } = ssh;

let getClientCallCount = 0
let client
function getClient() {
    getClientCallCount++
    console.log('getClientCallCount', getClientCallCount);
    if (!client) {
        client = new Client();
    }
    return client;
}

async function connectSSH({ host, username, password }) {
    const conn = getClient();
    conn.connect({
        host,
        username,
        password,
    });

    conn.on("ready", async () => {
        console.log("conn ready");
        console.log('going to end...');
        conn.end()
        conn.destroy()
    });
    conn.on("error", (err) => {
        console.log(`erorr at ${username}@${host}: ${err}`);
        conn.end();
    });
    conn.on("connect", () => {
        console.log("connected...");
    });
    conn.on("close", () => {
        console.log("close...");
    });
    conn.on("end", () => {
        console.log("end...");
    });
   
}


module.exports = {
    getClient,
    connectSSH
}