// let nums = [1, 2, 3];

// console.log('Blocking statement 1');

// setTimeout(() => {
//   console.log(nums.length);
//   console.log('Non blocking execution')
// }, 1000)

// nums.forEach((num) => console.log(num));

// setTimeout(() => console.log('After 0 secs'), 0);
// console.log('Blocking 2')

// for (let i = 0; i <= 5; i++) {
//   setTimeout(() => console.log(`${i}`), 1000);
// }

// Understand the promise Object
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Foo'), 1000);
})

console.log('Outside setTimeout 1.');
setTimeout(() => {
  console.log('Inside parent 1 setTimeout 1.');
  setTimeout(() => {
    console.log('Inside parent 2 setTimeout 1.');
    setTimeout(() => {
      console.log('Inside child setTimeout.');
    }, 3000);
    console.log('Inside parent 2 setTimeout 2.');
  }, 2000);
  console.log('Inside parent 1 setTimeout 2.');
}, 1000);
console.log('Outside setTimeout 2.');

let print3 = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`3`);
      resolve('Return Print3')
    }, 100);
  })
}

let print1 = async() => {
  console.log('1');
  setTimeout(() => console.log('5'), 200);
  return new Promise(async(resolve, reject) => {
    console.log('2');
    print3();
    resolve('Return Print');
    console.log('4');
  })
}

let start = async() => {
  print1();
  console.log('Done')
}

start();
