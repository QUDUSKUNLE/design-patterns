import { randomInt } from 'crypto';
import { SavingsAccount } from './savingsFactory'
import { CurrentsAccount } from './currentFactory';

enum ACCOUNTTYPE {
  SAVINGS = 'SAVINGS',
  CURRENTS = 'CURRENTS',
  BOTH = 'BOTH',
}

interface AccountName {
  AccountName(): string
}

interface CustomerSavingsInterface extends AccountName, SavingsAccount {}
interface CustomerCurrentsInterface extends Pick<CustomerSavingsInterface, 'AccountName'>, CurrentsAccount {}
interface CustomerBothInterface extends CustomerSavingsInterface, CurrentsAccount {}


abstract class CustomerAccountsFactory {
  public abstract factoryMethod(): CustomerSavingsInterface | CustomerCurrentsInterface | CustomerBothInterface
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

class CustomerCurrentFactory extends CustomerSavingsFactory implements CustomerCurrentsInterface {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName)
  }
  CurrentsAccountNumber(): string {
    return `c${randomInt(1234567)}`
  }
}

class CustomerBothFactory extends CustomerCurrentFactory implements CustomerBothInterface {
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName)
  }
}

class CreateCustomerAccounts extends CustomerAccountsFactory {
  constructor(private readonly firstName: string, private readonly lastName: string, private accountType: ACCOUNTTYPE) {
    super()
  }
  public factoryMethod(): CustomerSavingsInterface | CustomerCurrentsInterface | CustomerBothInterface {
    if (this.accountType === ACCOUNTTYPE.SAVINGS) return new CustomerSavingsFactory(this.firstName, this.lastName);
    if (this.accountType === ACCOUNTTYPE.CURRENTS) return new CustomerCurrentFactory(this.firstName, this.lastName);
    return new CustomerBothFactory(this.firstName, this.lastName);
  }
}

export function create(gtb: CustomerAccountsFactory, ENUMS: ACCOUNTTYPE) {
  switch (ENUMS) {
    case ACCOUNTTYPE.SAVINGS:
      gtb.factoryMethod() as CustomerSavingsInterface
      break;
    case ACCOUNTTYPE.CURRENTS:
      gtb.factoryMethod() as CustomerCurrentsInterface
      break;
    case ACCOUNTTYPE.BOTH:
      gtb.factoryMethod() as CustomerBothInterface
      break;
  }
}

create(new CreateCustomerAccounts('Abdul-Quddus', 'Yekeen', ACCOUNTTYPE.SAVINGS), ACCOUNTTYPE.SAVINGS)
