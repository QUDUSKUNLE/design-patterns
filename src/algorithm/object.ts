const [target, source, obj, obj1] = [{ a: 1, b: 2 }, { a: 4, b: 5 }, { a: 1 }, { a: 0, b: { c: 0 } }];

const returnedTarget = Object.assign(target, source);
const copy = Object.assign({}, obj)
const obj2 = Object.assign({}, obj1)

obj1.a = 1;
obj2.a = 2;
obj2.b.c = 3;


// Deep clone
const obj3 = { a: 0, b: { c: 0 } };
const obj4 = structuredClone(obj3)
obj3.a = 4;
obj3.b.c = 4;

const merg = Object.assign({}, obj1, obj2, obj3)
console.log(merg)
console.log(Object.getOwnPropertySymbols(merg));
