import { randomInt } from 'crypto';

export interface SavingsAccount {
  AccountName(): string;
  SavingsAccountNumber(): string;
}

abstract class CustomerSavingsAccount {
  public abstract factoryMethod(): SavingsAccount;
}

class CreateCustomerSavingsAccount implements SavingsAccount {
  constructor(private firstName: string, private lastName: string) {}
  AccountName(): string {
    return `${this.firstName.toLowerCase()} ${this.lastName.toUpperCase()}`
  }
  SavingsAccountNumber(): string {
    return `s${randomInt(1234567)}`
  }
}

class CreateSavingsAccount extends CustomerSavingsAccount {
  constructor(private firstName: string, private lastName: string) {
    super()
  }
  public factoryMethod(): SavingsAccount {
    return new CreateCustomerSavingsAccount(this.firstName, this.lastName);
  }
}

export function create(savings: CustomerSavingsAccount): void {
  console.log('Running savings account')
  const savingsAccount = savings.factoryMethod();
  console.log(savingsAccount.AccountName())
  console.log(savingsAccount.SavingsAccountNumber());
}

console.log('Testing Savings account.');
create(new CreateSavingsAccount('Abdul-Quddus', 'Yekeen'))
