/**
 * High-level modules should not depend on low-level modules;
 * both should depend on abstractions.
 * Abstractions should not depend on details; details should depend on abstractions.
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

  operate() {}
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
