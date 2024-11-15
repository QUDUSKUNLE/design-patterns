const object = { a: 1 };
const a = { b: 2, c:3, d: 4}

function Box(value) {
  this.value = value;
}

function Constructor() {}

const obj = new Constructor();
Constructor.prototype.name = 'Box';
console.log(obj.name, '>>>>>>>>>', Constructor.prototype)

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

Box.prototype.getValue = function () {
  return this.value + 1;
}

const box = new Box(2);
console.log(box.getValue(), Box.prototype);

function Base() {}
function Derived() {}

Derived.prototype = Object.create(Base.prototype);

const copy = Object.assign(a, object, {})

const person = {
  isHuman: false,
  printIntroduction: function() {
    const name = this.name ? this.name : "John Doe"
    console.log(`My name is ${name}. Am I human? ${this.isHuman}`)
  }
}

const me = Object.create(person)
const your = Object.assign({}, person)
const your1 = Object.create(me)
me.name = 'Abdul-Muhsin'
me.isHuman = true;
me.printIntroduction()
your.printIntroduction()
your1.printIntroduction()

console.log(your1)
