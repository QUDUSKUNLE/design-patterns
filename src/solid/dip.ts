/**
 * High-level modules should not depend on low-level modules;
 * both should depend on abstractions.
 * Abstractions should not depend on details; details should depend on abstractions.
 * Low Level classes which do operations like reading from a database or saving a file
 * High level classses whihc implement the business logic and use those low level classes
 * The principle proposes is that high level classes depend on interfaces instead of concrete implementations.
 */

// Before DIP
class LightBulb {
  turnOn() {}
  turnOff() {}
}

class Switch {
  private bulb: LightBulb;

  constructor(bulb: LightBulb) {
    this.bulb = bulb;
  }

  operate() {
    this.bulb.turnOn
  }
}


// After DIP
interface Switchable {
  operate(): void;
}

class LightBulbs implements Switchable {
  turnOn() {}

  turnOff() {}

  operate(): void {
    throw new Error("Method not implemented.");
  }
}

class Switchs {
  private device: Switchable;

  constructor(device: Switchable) {
    this.device = device;
  }

  operate() {
    this.device.operate();
  }
}

// Another dip implementation
interface Order {
  id?: string;
}

interface Update extends Required<Order> {}

// Another set of DIP
interface Database {
  get(orderID: string): void;
  save(order: Order): void;
  update(order: Update): void;
  delete(orderID: string): void;
}

class OrderService {
  database: Database

  constructor(database: Database) {
    this.database = database
  }
  save(order: Order): void {
    this.database.save(order)
  }
  update(update: Update): void {
    this.database.update(update)
  }
  delete(order: Update): void {
    this.database.delete(order.id)
  }
  get(order: Update): void {
    this.database.get(order.id)
  }
}

class MySQLDatabase implements Database {
  delete(orderID: string): void {
    // delete order
  }
  update(order: Update): void {
    // update
  }
  save(order: Order): void {
    // insert
  }
  get(orderId: string): void {
    // get an order
  }
}
