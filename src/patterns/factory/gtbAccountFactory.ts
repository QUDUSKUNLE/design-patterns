import { randomInt } from "crypto";
import { SavingsAccount } from "./savingsFactory";
import { CurrentsAccount } from "./currentFactory";

enum ACCOUNTTYPE {
  SAVINGS = "SAVINGS",
  CURRENTS = "CURRENTS",
}

interface AccountName {
  AccountName(): string;
}

interface Account {
  accountName: string;
  savingAccount: string;
  currentAccount?: string;
}

interface CustomerSavingsInterface extends AccountName, SavingsAccount {}
interface CustomerCurrentsInterface
  extends CustomerSavingsInterface, CurrentsAccount {}

abstract class CustomerAccountsFactory {
  public abstract FactoryMethod():
    | CustomerSavingsInterface
    | CustomerCurrentsInterface
}

abstract class CustomerAccountName {
  constructor(
    private firstName: string,
    private lastName: string,
  ) {}
  AccountName(): string {
    return `${this.firstName.toLowerCase()} ${this.lastName.toUpperCase()}`;
  }
}

class CustomerSavingsFactory
  extends CustomerAccountName
  implements CustomerSavingsInterface
{
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
  SavingsAccountNumber(): string {
    return `s${randomInt(1234567)}`;
  }
}

class CustomerCurrentFactory
  extends CustomerSavingsFactory
  implements CustomerCurrentsInterface
{
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
  CurrentsAccountNumber(): string {
    return `c${randomInt(1234567)}`;
  }
}

export class CreateCustomerAccounts extends CustomerAccountsFactory {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private accountType: ACCOUNTTYPE,
  ) {
    super();
  }
  public FactoryMethod():
    | CustomerSavingsInterface
    | CustomerCurrentsInterface {
    if (this.accountType === ACCOUNTTYPE.SAVINGS)
      return new CustomerSavingsFactory(this.firstName, this.lastName);
    return new CustomerCurrentFactory(this.firstName, this.lastName);
  }
}

function create(gtb: CustomerAccountsFactory, ENUMS: ACCOUNTTYPE): Account {
  switch (ENUMS) {
    case ACCOUNTTYPE.CURRENTS:
      const current = <CustomerCurrentsInterface>gtb.FactoryMethod()
      return {
        accountName: current.AccountName(),
        savingAccount: current.SavingsAccountNumber(),
        currentAccount: current.CurrentsAccountNumber(),
      }
    }
  const savings = <CustomerSavingsInterface>gtb.FactoryMethod()
  return {
    accountName: savings.AccountName(),
    savingAccount: savings.SavingsAccountNumber() 
  }
}

const gtb = new CreateCustomerAccounts("Abdul-Muhsin", "Abdul-Quddus", ACCOUNTTYPE.SAVINGS)
create(gtb, ACCOUNTTYPE.SAVINGS)
create(gtb, ACCOUNTTYPE.CURRENTS)

