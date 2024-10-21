function isPalindrome(str: number): boolean {
  if (str < 0) return false
  const arrayNumber = (str).toString().split('')
  const arrayLength = arrayNumber.length;
  let newString = '';
  for (let i = arrayLength - 1; i >= 0; i--) {
    newString += arrayNumber[i]
  }
  return parseInt(newString, 10) === str ? true : false;
}

console.log(isPalindrome(1111))
