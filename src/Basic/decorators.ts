abstract class Car {
  public description!: string;
  public getDescription() {
    return this.description;
  }
  public abstract cost(): number;
}

class ModelS extends Car {
  public description = 'Model S';

  public cost() {
    return 1;
  }
}

class ModelX extends Car {
  public description = 'Model X';

  public cost() {
    return 2;
  }
}

abstract class CarOptions extends Car {
  decorateCar: Car;
  constructor(car: Car) {
    super();
    this.decorateCar = car;
  }
  public abstract getDescription(): string;
  public abstract cost(): number;
}


class EnhancedAutoPilot extends CarOptions {
  decoratedCar: Car;
  
  constructor(car: Car) {
    super(car);
    this.decoratedCar = car;
  }
  
  public getDescription(): string {
    return `${this.decoratedCar.getDescription()}, with enhanced auto pilot`;
  }

  public cost() {
    return this.decoratedCar.cost() + 5000;
  }
}


class RearFacingSeats extends CarOptions {
  decoratedCar: Car;
  
  constructor(car: Car) {
    super(car);
    this.decoratedCar = car;
  }
  
  public getDescription() {
    return `${this.decoratedCar.getDescription()}, with rear facing seats`;
  }

  public cost() {
    return this.decoratedCar.cost() + 4000;
  }
}

let tesla = new ModelS();
tesla = new RearFacingSeats(tesla);

// Decorator Factory is simply a function that returns the expression that will be
// called by the decorator at runtime
function color() {
  return function sealed() {
    console.log('This class is not meant to be extended');
  }
}


