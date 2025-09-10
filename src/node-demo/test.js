const { spawn } = require('child_process');

function runSSHCommand(user, hostname, callback) {
    return new Promise((resolve, reject) => {
        const ssh = spawn('ssh', [`${user}@${hostname}`]);

        let stdout = '';
        let stderr = ''

        if (typeof callback === 'function') {
            callback(ssh, resolve, reject)
        };

        ssh.stdout.on('data', (data) => {
            console.log("stdout", data.toString());
            stdout += data.toString();
        });

        ssh.stderr.on('data', (data) => {
            console.log("stderr", data.toString());
            stderr += data.toString();
        });

        ssh.on('close', (code) => {
            if (code === 0) {
                resolve({ stdout, stderr });
            } else {
                reject(new Error(`SSH command failed with code ${code}`));
            }
        });
    });
}

const username = "root"
const host = "192.168.253.65"

// 使用示例
runSSHCommand(
    username,
    host,
    (child, resolve, reject) => {
        setTimeout(() => {
            resolve()
            console.log('emit close');
            child.emit("close", 0);
            child.kill();
        }, 2 * 1000)
    })
    .then((result) => {
        console.log('stdout:', result.stdout);
        console.log('stderr:', result.stderr);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
