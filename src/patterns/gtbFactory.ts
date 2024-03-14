import { Savings } from "./savingsFactory";
import { Currents } from "./currentFactory";

export interface GTBank {
  savings(): Savings;
  currents?(): Currents;
}

abstract class GTBankAccount {
  public abstract factoryMethod(): GTBank
}

class CreateGTBank implements GTBank {
  savings (): Savings {
    throw new Error( "Method not implemented." );
  }
  currents?(): Currents {
    throw new Error( "Method not implemented." );
  }
}

class CreateGTBankAccount extends GTBankAccount {
  constructor() {
    super();
  }

  public factoryMethod(): GTBank {
      return new CreateGTBank()
  }
}

export function create(gtbank: GTBankAccount): void {
  console.log('Running GTBank')
  const gtb = gtbank.factoryMethod();
}
