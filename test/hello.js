

const original = console.log

console.log = (...args) => {
    original("log...")
    original(...args)
}

console.log(11111);