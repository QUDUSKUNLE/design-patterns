let pattern = /[^(a-z|A-Z)]/g

const str = 'My Name is AbdulQuddus Yekeen'

console.log(str.match(pattern), !pattern.test(str));
