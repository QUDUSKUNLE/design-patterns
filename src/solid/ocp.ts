// Open/Closed Principle
/**
 * 
 * Software entities (classes, modules, functions) should be open
 * for extension but closed for modification.
 * You should be able to add new functionality without changing existing code.
 */

// Before OCP
class Area {
  width!: number;
  height!: number;
}

class AreaCalculator {
  calculateArea(rectangle: Area) {
    return rectangle.width * rectangle.height;
  }
}


// After OCP
interface Shape {
  calculateArea(): number;
  calculatePerimeter(): number;
}

class Reactangle implements Shape {
  height: number;
  width: number;
  constructor(height: number, width: number) {
    [this.height, this.width] = [height, width]
  }

  calculateArea(): number {
    return this.height * this.width;
  }

  calculatePerimeter(): number {
    return 2 * (this.height + this.width);
  }
}


abstract class Circle implements Shape {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
