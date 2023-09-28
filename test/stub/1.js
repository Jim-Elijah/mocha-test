const { Readable } = require("stream");

let count = 0;
const readableStream = new Readable({
    read(size) {
        this.push('foo');
        if (count === 5) this.push(null);
        count++;
    }
});

// piping
readableStream.pipe(process.stdout)

// through the data event
// readableStream.on('data', (chunk) => {
//   console.log(chunk.toString());
// });