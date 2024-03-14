
export interface Savings {
  savings(): void;
  debits(): void;
}

abstract class SavingsAccount {
  public abstract factoryMethod(): Savings;
}

class CreateSavings implements Savings {
  constructor(private saving: Accounts) {}
  debits(): void {
    throw new Error('Method not implemented.');
  }
  savings(): void {
    throw new Error('Method not implemented.');
  }
}

class CreateSavingsAccount extends SavingsAccount {
  constructor(private saving: Accounts) {
    super()
  }
  public factoryMethod(): Savings {
    return new CreateSavings(this.saving)
  }
}

export function create(savings: SavingsAccount): void {
  console.log('Running savings account')
  const savingsAccount = savings.factoryMethod();
}
