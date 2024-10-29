// const { describe, it, before, beforeEach } = require('mocha')
const sinon = require('sinon');

const name = 'jim'
let outter = 1, arr = [], item;
arr = [Math.random().toString().slice(-5), Math.random().toString().slice(-5)],
item = arr[0]
console.log('arr', JSON.stringify(arr), item);
describe('Outer describe', () => {
    before(() => {
        console.log('before');
      
    }) 
    // after(() => {
    //     console.log('after');
    // })
    // beforeEach(() => {
    //     console.log('Before outer describe');
    // });

    it('should do something', () => {
        console.log('Test case222', outter);
    });

    describe(`Inner describe: ${name}`, () => {
        let inner = 2
        // beforeEach(() => {
        //     console.log('Before inner describe');
        // });

        // for (let item of arr) {
        describe(item, () => {
            it(`should do something ${item}`, () => {
                console.log('Test case', outter, inner, item);
            });
        })
        // }
    });
});