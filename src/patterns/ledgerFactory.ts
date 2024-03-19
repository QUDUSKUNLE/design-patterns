
enum TransactionsEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  LEND = 'LEND',
  PURCHASE = 'PURCHASE'
}

interface LedgerInterface {
  TransactionID: string
  AccountID: string;
  TransactionType: TransactionsEnum,
  Amount: number;
}

interface LedgerTransactions<T> {
  DebitLedger(ok: T): void;
  CreditLedger(ok: T): void;
  LendLedger(ok: T): void;
  PurchaseLedger(ok: T): void;
}

abstract class LedgerTransaction {
  public abstract FactoryMethod(): LedgerTransactions<LedgerInterface>
}

class LedgerTrasctionsFactory implements LedgerTransactions<LedgerInterface> {
  DebitLedger(ok: LedgerInterface): void {
    throw new Error('Method not implemented.');
  }
  CreditLedger(ok: LedgerInterface): void {
    throw new Error('Method not implemented.');
  }
  LendLedger(ok: LedgerInterface): void {
    throw new Error('Method not implemented.');
  }
  PurchaseLedger(ok: LedgerInterface): void {
    throw new Error('Method not implemented.');
  }
}

class CreateLedgerTransactionFactory extends LedgerTransaction {
  public FactoryMethod (): LedgerTransactions<LedgerInterface> {
    return new LedgerTrasctionsFactory()
  }
}

export function create(ledgerTransaction: LedgerTransaction) {
  ledgerTransaction.FactoryMethod()
}
