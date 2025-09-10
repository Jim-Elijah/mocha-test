const os = require("os")

const platform = os.platform();
const isWin = platform === "win32"

module.exports = {
    isWin,
}