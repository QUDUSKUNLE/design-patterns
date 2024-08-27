type SavingsAccount = {
  Savings(acc: Account): void;
}

type CurrentAccount = {
  Current(acc: Account): void;
}

type Account = {
  Name: string;
  Nin: string;
  AccountType: AccountType
}

interface OpenAccount extends SavingsAccount, CurrentAccount {}

enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT',
}

class Savings implements SavingsAccount {
  Savings(acc: Account): void {
    console.log(`Creating a savings ${acc.Name} in ${acc.AccountType}`)
  }
}

class OpenAccountClass extends Savings implements CurrentAccount {
  constructor() {
    super()
  }
  Current(acc: Account): void {
    console.log(`Creating a current ${acc.Name} in ${acc.Nin}`)
  }
}

export { OpenAccount, OpenAccountClass, CurrentAccount, Account, AccountType}
