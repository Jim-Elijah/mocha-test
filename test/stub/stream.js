const fs = require('fs')

const src = './1.txt'
const dest = './2.txt'

const writeStream = fs.createWriteStream(dest);
const readStream = fs.createReadStream(src);

writeStream.write("1222")
readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('finish');
})
readStream.on("end", async () => {
    console.log('end');
})