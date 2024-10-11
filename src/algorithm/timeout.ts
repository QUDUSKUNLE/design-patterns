
console.log('Test Time out')

setTimeout(() => {
  console.log('First Time out')
  setTimeout(() => {
    console.log('Second Time out')
    setTimeout(() => {
      console.log('Third Time out')
    }, 1000);
    setTimeout(() => {
      console.log('Fourth Time out')
    }, 100);
  }, 1000);
}, 1000);

console.log('Test Time out ends')
