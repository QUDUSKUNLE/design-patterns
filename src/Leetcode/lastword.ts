const LengthOfLastWord = (str: string): number => {
  let max = 0
  for (const word of str.trim().split(' ')) {
    max = Math.max(max, word.trim().length)
  }
  return max
}

console.log(LengthOfLastWord("   fly me   to   the moon  yes sir Abdul-Muhsin"))
