/**
 * A class should not be forced to implement interfaces it does not use.
 * Clients should not be forced to depend on interfaces they do not use.
 */

// Before ISP
interface Works {
  work(): void;
  takeBreak(): void;
}

class Managers implements Works {
  work(): void {}
  // Managers do not take break
  takeBreak(): void {}
}

// After ISP
interface Workable {
  work(): void
}

interface Breakable {
  takeBreak(): void
}

class Manager implements Workable {
  work(): void {}
}

class Employees implements Workable, Breakable {
  takeBreak (): void {
    throw new Error("Method not implemented.");
  }
  work (): void {
    throw new Error("Method not implemented.");
  }
}
