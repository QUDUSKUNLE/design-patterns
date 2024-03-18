import { randomInt } from 'crypto';
import { SavingsAccount } from './savingsFactory';

export interface CurrentsAccount extends Pick<SavingsAccount, 'AccountName'> {
  CurrentsAccountNumber(): string
}

abstract class CustomerCurrentsAccountCreator {
  public abstract factoryMethod(): CurrentsAccount;
}

class CustomerCurrentsAccount implements CurrentsAccount {
  constructor(private firstName: string, private lastName: string) {}
  AccountName(): string {
    return `${this.firstName.toLowerCase()} ${this.lastName.toUpperCase()}`
  }
  CurrentsAccountNumber(): string {
    return `c${randomInt(1234567)}`
  }
}

class CreateCurrentsAccount extends CustomerCurrentsAccountCreator {
  constructor(private firstName: string, private lastName: string) {
    super()
  }
  public factoryMethod(): CurrentsAccount {
    return new CustomerCurrentsAccount(this.firstName, this.lastName)
  }
}

export function create(current: CustomerCurrentsAccountCreator): void {
  console.log('Running current account')
  const currentAccount = current.factoryMethod();
}
