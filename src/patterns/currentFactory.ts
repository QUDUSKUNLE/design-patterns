import { Savings } from "./savingsFactory";

export interface Currents extends Savings {
  lends(): void
}

abstract class CurrentAccount {
  public abstract factoryMethod(): Currents
}

class CreateCurrents implements Currents {
  lends (): void {
    throw new Error( "Method not implemented." );
  }
  savings (): void {
    throw new Error( "Method not implemented." );
  }
  debits (): void {
    throw new Error( "Method not implemented." );
  }
}

class CreateCurrentAccount extends CurrentAccount {
  constructor() {
    super()
  }
  public factoryMethod(): Currents {
    return new CreateCurrents()
  }
}

export function create(current: CurrentAccount): void {
  console.log('Running current account')
  const currentAccount = current.factoryMethod();
}
