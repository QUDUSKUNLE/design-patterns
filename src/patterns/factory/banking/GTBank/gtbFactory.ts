import { Account, AccountType, OpenAccount, OpenAccountClass } from './account';
import { Transact, Transaction, TransactionClass, TransactionType } from './transaction';

interface GTBank {
  openAccount(account: Account): OpenAccount;
  transactions(transact: Transact): Transaction;
}

abstract class GTBankFactory {
  public abstract FactoryMethod(): GTBank
}

class CreateGTBank implements GTBank {
  private accountOpening = new OpenAccountClass()
  private transaction = new TransactionClass()
  openAccount(a: Account): OpenAccount {
    switch (a.AccountType) {
      case AccountType.CURRENT:
        this.accountOpening.Savings(a)
        this.accountOpening.Current(a)
        return this.accountOpening
      default:
        this.accountOpening.Savings(a)
        return this.accountOpening
    }
  }
  transactions(transact: Required<Transact>): Transaction {
    switch (transact.TransactionType) {
      case TransactionType.DEBIT:
        this.transaction.Debit(transact)
        return this.transaction
      default:
        this.transaction.Savings(transact)
        return this.transaction
    }
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

function create(guaranty: GTBankFactory): void {
  const gtb = guaranty.FactoryMethod()
  gtb.transactions({ AccountNumber: 'Abdul-Muhsin', TransactionType: TransactionType.DEBIT, Amount: 25000, TransferAccount: '1234455665'})
}


create(new WelcomeToGTBank())
