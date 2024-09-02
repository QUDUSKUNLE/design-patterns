type AccountNumber = {
  NewAccountNumber(acc: Account): string
}

type Account = {
  Nin: string;
  AccountType: AccountType
}

enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT', 
}

class OpenAccount implements AccountNumber {
  NewAccountNumber(acc: Account): string {
    console.log(`${acc.AccountType.toLocaleLowerCase()} account created successfully.`)
    return `${acc.AccountType}:${acc.Nin}`
  }
}

export { OpenAccount, Account, AccountType }
