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

class Bird implements Flyable {
  fly(): void {}
}

class Penguin implements Flyable {
  // Can't fly but still implements fly for consistency
  fly(): void {}
}
