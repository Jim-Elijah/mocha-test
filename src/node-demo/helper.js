const { spawn } = require("child_process")

function promisifySpawn(command, args, options, callback) {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, args, options || {});
        let stdout = "";
        let stderr = "";

        if (typeof callback === 'function') {
            // callback(childProcess)
        }
        childProcess.stdout.on("data", data => {
            console.log("stdout", data.toString());
            stdout += data.toString();
        });

        childProcess.stderr.on("data", data => {
            console.log("stderr", data.toString());
            stderr += data.toString();
        });

        childProcess.on("close", code => {
            console.log('close', code);
            if (code === 0) {
                resolve({ stdout, stderr });
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });

        childProcess.on("error", err => {
            reject(err);
        });
    });
}

module.exports = {
    promisifySpawn,
}