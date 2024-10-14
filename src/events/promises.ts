
function doSomethings1(): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Dosomething 1000')
    }, 1000);
  })
}

function doSomethings2(): Promise<unknown> {
  return new Promise((resolverOuter) => {
    resolverOuter(new Promise((resolveInner) => {
      setTimeout(() => resolveInner('Dosomething 750'), 7500);
    }))
  })
}

function doReject1(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Reject 10000');
    }, 10000)
  })
}

function doReject2(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Reject 5000');
    }, 5000)
  })
}

// doSomethings1().then((res) => console.log(res));
// doSomethings2().then((res) => console.log(res));
console.log('Immediate logging');

// Fulfills when all promises fulfill. Reject when any of the promises rejects (Promise.all)
(async () => {
  try {
    const [resultAll1, resultAll2, resultAll3, resultAll4] = await Promise.all([doSomethings1(), doSomethings2(), doReject1(), doReject2()])
    console.log(resultAll1,  resultAll2, resultAll3, resultAll4, 'all');
  } catch (error) {
    console.log(error)
  }
})();


// Settles when any of the promises settled.  (Promise.race)
(async () => {
  try {
    const resultAll1 = await Promise.race([doSomethings1(), doSomethings2(), doReject1(), doReject2()])
    console.log(resultAll1, 'race');
  } catch (error) {
    console.log(error)
  }
})();

// Fulfills when any of the promises fulfills, reject when all rejects  (Promise.any)
(async () => {
  try {
    const resultAll1 = await Promise.any([doSomethings1(), doSomethings2(), doReject1(), doReject2()])
    console.log(resultAll1, 'any');
  } catch (error) {
    console.log(error)
  }
})();


// Fulfills when all promises settled. (Promise.allSettled)
(async () => {
  try {
    const [resultAll1, resultAll2, resultAll3] = await Promise.allSettled([doSomethings1(), doSomethings2(), doReject1()])
    console.log(resultAll1, resultAll2, resultAll3, 'allSettled');
  } catch (error) {
    console.log(error)
  }
})();
