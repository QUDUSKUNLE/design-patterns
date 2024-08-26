const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
];

interface ArrayType {
  id: number;
  name: number;
}

const arr2 = [
  { 
    id: '1',
    name: 2
  },
  {
    id: '2',
    name: 2
  },
  {
    id: '3',
    name: 50
  },
  {
    id: '4',
    name: 79
  },
  {
    id: '4',
    name: 79
  }
]

console.time('reduce')
let result1 = arr.reduce((acc, item) => acc += item, 0)
console.log(result1)
console.timeEnd('reduce')

console.time('for')
let result3 = 0
for (const value of arr) {
  result3 += value
}
console.log(result3)
console.timeEnd('for')


let result2 = arr2.reduce<Record<string, number>>((acc: Record<string, number>, current) => {
  acc[current.id] = acc[current.id] ? acc[current.id] += 1 : 1
  return acc
}, {})

console.log(result2)
