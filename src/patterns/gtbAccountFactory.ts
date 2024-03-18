import { randomInt } from 'crypto';
import { SavingsAccount } from './savingsFactory'
import { CurrentsAccount } from './currentFactory';

enum ACCOUNTTYPE {
  SAVINGS = 'SAVINGS',
  CURRENTS = 'CURRENTS',
}

interface AccountName {
  AccountName(): string
}

interface CustomerSavingsInterface extends AccountName, SavingsAccount {}
interface CustomerCurrentsInterface extends AccountName, CurrentsAccount {}


abstract class CustomerAccountsFactory {
  public abstract factoryMethod(): CustomerSavingsInterface | CustomerCurrentsInterface
}

class CustomerAccountName {
  constructor(private firstName: string, private lastName: string) {}
  AccountName(): string {
    return `${this.firstName.toLowerCase()} ${this.lastName.toUpperCase()}`
  }
}

class CustomerSavingsFactory extends CustomerAccountName implements CustomerSavingsInterface {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
  SavingsAccountNumber(): string {
    return `s${randomInt(1234567)}`
  }
}

class CustomerCurrentFactory extends CustomerAccountName implements CustomerCurrentsInterface {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName)
  }
  CurrentsAccountNumber(): string {
    return `c${randomInt(1234567)}`
  }
}

class CreateCustomerAccounts extends CustomerAccountsFactory {
  constructor(private readonly firstName: string, private readonly lastName: string, private accountType: ACCOUNTTYPE) {
    super()
  }
  public factoryMethod(): CustomerSavingsInterface | CustomerCurrentsInterface {
    if (this.accountType === ACCOUNTTYPE.SAVINGS) return new CustomerSavingsFactory(this.firstName, this.lastName);
    return new CustomerCurrentFactory(this.firstName, this.lastName);
  }
}

export function create(gtb: CustomerAccountsFactory, ENUMS: ACCOUNTTYPE) {
  switch (ENUMS) {
    case ACCOUNTTYPE.CURRENTS:
      const account = gtb.factoryMethod() as CustomerCurrentsInterface
      console.log(account.CurrentsAccountNumber());
      console.log(account.AccountName())
      break;
    case ACCOUNTTYPE.SAVINGS: 
      const savings = gtb.factoryMethod() as CustomerSavingsInterface
      console.log(savings.SavingsAccountNumber());
      console.log(savings.AccountName());
      break;
  }
}

create(new CreateCustomerAccounts('Abdul-Quddus', 'Yekeen', ACCOUNTTYPE.CURRENTS), ACCOUNTTYPE.CURRENTS)
