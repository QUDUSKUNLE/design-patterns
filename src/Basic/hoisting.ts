/**
 * What is Good?
 * let and const have block scope.
 * let and const can not be redeclared.
 * let and const must be declared before use.
 * let and const does not bind to this.
 * let and const are not hoisted.
 */

let x = 'John Doe'

// let x = 0;

var y = 10;
console.log(y)

{
  var y = 30
  console.log(y)
}

console.log(y)
