/**
 * Objects of a superclass should be replaceable with objects of a subclass
 * without affecting the correctness of the program.
 * Subtypes must be substitutable for their base types.
 */

// Before LSP
class Birds {
  fly() {}
}

class Penguins extends Birds {
  // Penguin can't fly
}

// After LSP
interface Flyable {
  fly(): void
}

interface Walkable {
  work(): void
}

class Bird implements Flyable {
  fly(): void {}
}

class Duck implements Flyable, Walkable {
  work(): void {
    throw new Error( "Method not implemented." )
  }
  fly(): void {}
}
