/* Builder Pattern is a creational pattern which allows to create complex
* objects in an easy way
*/ 

/* 1
* Define a builder pattern which will create cars and motorcycles
*/ 

interface Builder {
  setSeats(seats: number): this;
  setEngine(engine: string): this;
}

class Cars implements Builder {
  setSeats(seats: number): this {
    console.log(`Build car ${seats} seats`)
    return this
  }
  setEngine(engine: string): this {
    console.log(`Build car ${engine} enginee`)
    return this
  }
}

class MotorCycles implements Builder {
  setSeats(seats: number): this {
    console.log(`Build motorcycle ${seats} seats`)
    return this
  }
  setEngine(engine: string): this {
    console.log(`Build motorcycle ${engine} enginee`)
    return this
  }
}

class CarBuilder implements Builder {
  private car: Cars
  setSeats(seats: number): this {
    this.car.setSeats(seats)
    return this;
  }
  setEngine(engine: string): this {
    this.car.setEngine(engine)
    return this;
  }
  public getResult(): Cars {
    return this.car
  }
  constructor() {
    this.car = new Cars();
  }
}

class MotorCyclesBuilder implements Builder {
  private motorcycles: MotorCycles
  setSeats(seats: number): this {
    this.motorcycles.setSeats(seats)
    return this;
  }
  setEngine(engine: string): this {
    this.motorcycles.setEngine(engine)
    return this;
  }
  public getResult(): MotorCycles {
    return this.motorcycles;
  }
  constructor() {
    this.motorcycles = new MotorCycles();
  }
}

class Director {
  public buildFerrari(): Cars {
    return new CarBuilder().setEngine('Ferrari').setSeats(4).getResult()
  }
  public buildToyota(): Cars {
    return new CarBuilder().setEngine('Toyota').setSeats(7).getResult()
  }
  public buildHonda(): MotorCycles {
    return new MotorCyclesBuilder().setEngine('Honda').setSeats(2).getResult()
  }
  public buildYamaha(): MotorCycles {
    return new MotorCyclesBuilder().setEngine('Yamaha').setSeats(1).getResult()
  }
}

const director = new Director();
director.buildFerrari();
director.buildToyota();
director.buildHonda();
director.buildYamaha();
