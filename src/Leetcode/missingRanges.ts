/*
* Given a sorted integer array where the range of elements are [0, 99]
* inclusive, return its missing ranges. For example, given [0, 1, 3, 50, 75],
* return [“2”, “4->49”, “51->74”, “76->99”]
*/ 

const returnMissingRange = (num: Array<number>): Array<string> => {
  const result = [];
  for (let index = 1; index < num.length; index++) {
    let range = ''
    let curr = num[index], prev = num[index + 1]
    if (prev - curr >= 2) {
      range += prev - 1 > curr + 1 ? `${curr + 1}->${prev - 1}` : `${curr + 1}`
      // Last exception
      if (index === num.length - 1 && curr < 99) {
        range += `${num[num.length - 1] + 1}->${99}`
      }
    }
    if (range !== '') result.push(range)
  }
  return result
}

console.log(returnMissingRange([0, 1, 5, 7, 8, 23, 24, 42, 43, 50, 65, 67, 75, 80, 97, 99]))
