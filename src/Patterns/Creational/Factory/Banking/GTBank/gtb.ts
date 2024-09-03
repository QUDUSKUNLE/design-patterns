import { Account, AccountType, OpenAccount } from './account';
import { DebitInterface, SavingsInterface, SavingsClass, DebitClass, TransactionType } from './transaction';

interface GTBank {
  openAccount(account: Account): void
  savings(save: SavingsInterface): void
  debits(debit: DebitInterface): void
}

abstract class GTBankFactory {
  public abstract FactoryMethod(): GTBank
}

class CreateGTBank implements GTBank {
  private debitAccount = new DebitClass()
  private savingsAccount = new SavingsClass()
  private account = new OpenAccount()
  openAccount(account: Account): void {
    const accountNumber = this.account.NewAccountNumber(account)
    console.log(accountNumber);
  }
  savings(save: SavingsInterface): void {
    this.savingsAccount.Savings(save);
  }
  debits(debit: DebitInterface): void {
    this.debitAccount.Debit(debit);
  }
}

class WelcomeToGTBank extends GTBankFactory {
  constructor() {
    super();
  }
  public FactoryMethod(): GTBank {
    return new CreateGTBank()
  }
}

// Factory Design Pattern
function create(guaranty: GTBankFactory): void {
  const gtb = guaranty.FactoryMethod()
  // gtb.transactions({ AccountNumber: 'Abdul-Muhsin', TransactionType: TransactionType.DEBIT, Amount: 25000, TransferAccount: '1234455665'})
  gtb.openAccount({ Nin: '1234567890', AccountType: AccountType.CURRENT})
  gtb.savings({AccountNumber: '1234567', Amount: 25000, TransactionType: TransactionType.SAVINGS})
}


create(new WelcomeToGTBank())
