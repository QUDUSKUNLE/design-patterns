type Savings = {
  Savings(acc: Transact): void
}

type Debits = {
  Debit(acc: Required<Transact>): void
}

type Transact = {
  AccountNumber: string;
  Amount: number;
  TransactionType: TransactionType;
  TransferAccount?: string;
}

interface Transaction extends Savings, Debits {}

enum TransactionType {
  DEBIT = 'DEBIT',
  SAVINGS = 'SAVINGS'
}

class SavingsTransaction implements Savings {
  Savings(acc: Transact): void {
    console.log(`Savings ${acc.Amount} in ${acc.AccountNumber}`)
  }
}

class TransactionClass extends SavingsTransaction implements Transaction {
  constructor() {
    super();
  }
  Debit(acc: Required<Transact>): void {
    if (!acc.TransferAccount) {
      throw new Error(`Cannot perform the operation now, the transferAccount number is required`)
    }
    console.log(`Debit ${acc.Amount} in ${acc.AccountNumber} by transferring to ${acc.TransferAccount}`)
  }
}

export { TransactionClass, Transaction, Transact, TransactionType }
