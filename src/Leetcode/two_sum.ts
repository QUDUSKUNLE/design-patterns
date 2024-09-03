/*
* Given an array of integers, find two numbers such that they add up to a specific target number.
* The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
* You may assume that each input would have exactly one solution.
*/ 

const map = new Map();

const twoSum = (arr: number[], target: number): number[] => {
  for (let index = 1; index <= arr.length; index++) {
    if (arr.indexOf(target - arr[index]) !== -1 && index !== arr.indexOf(target - arr[index])) {
      return [index, arr.indexOf(target - arr[index])]
    }
  }
  throw new Error('No two sum solution')
}

// This does not solve the problem for already sorted array.
const towSum = (arr: number[], target: number): number[] => {
  for (let index = 1; index <= arr.length; index++) {
    if (map.has(target - arr[index])) {
      return [map.get(target - arr[index]), index];
    }
    map.set(arr[index], index)
  }
  throw new Error('No two sum solution')
}

console.log(twoSum([1,2,3,4,5,6,7,9], 9))
console.log(towSum([1,2,3,4,5,6,7,9], 9))
