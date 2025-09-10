const sinon = require('sinon');

const clock = sinon.useFakeTimers();

console.log(new Date());  // 输出当前时间

clock.tick(1000);  // 时间前进1秒
console.log(new Date());  // 输出当前时间

clock.tick(2000);  // 时间前进2秒
console.log(new Date());  // 输出当前时间

clock.restore();