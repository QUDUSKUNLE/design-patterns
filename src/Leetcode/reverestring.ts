// Reverse string word by word
const reverseString = (str: string): string => {
  const strArray = str.split(' ')
  let result = ''
  for (let index = strArray.length - 1; index >= 0; index--) {
    result +=  index === 0 ? strArray[index] : strArray[index] + ' '
  }
  return result
}

const names = 'My name is Abdul-Muhsin Abdul-Quddus Yekeen'
console.log(reverseString('the sky is blue'))
console.log(reverseString(names))
