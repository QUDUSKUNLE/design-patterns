/**
 * Given a string, find the length of the longest substring without
 * repeating characters. For example, the longest substring without repeating
 * letters for “abcabcbb” is “abc”, which the length is 3. For “bbbbb” the
 * longest substring is “b”, with the length of 1
 */

const longestSubstring = (str: string): string => {
  let largestSubstring = ''
  for (let i = 1; i <= str.length; i++) {
    if (i === 1) largestSubstring += str.substring(i - 1, i)
    else {
      if (!largestSubstring.includes(str.substring(i - 1, i))) {
        largestSubstring += str.substring(i - 1, i)
      }
    }
  }
  return largestSubstring;
}

console.log(longestSubstring('bbbbbbb'))
