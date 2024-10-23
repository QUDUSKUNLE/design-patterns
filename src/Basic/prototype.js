const object = { a: 1 };

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
