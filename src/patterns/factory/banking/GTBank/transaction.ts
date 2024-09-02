type Savings = {
  Savings(acc: SavingsInterface): void
}

type Debits = {
  Debit(acc: DebitInterface): void
}

type SavingsInterface = {
  AccountNumber: string;
  Amount: number;
  TransactionType: TransactionType.SAVINGS;
} 

type DebitInterface = {
  TransferAccount: string;
  // TransactionType: TransactionType.DEBIT;
} & SavingsInterface


enum TransactionType {
  DEBIT = 'DEBIT',
  SAVINGS = 'SAVINGS'
}

class DebitClass implements Debits {
  Debit(acc: DebitInterface): void {
    console.log(`N${acc.Amount} debited in ${acc.AccountNumber} by transferring to ${acc.TransferAccount}`)
  }
}

class SavingsClass implements Savings {
  Savings(acc: SavingsInterface): void {
    console.log(`N${acc.Amount} saved successfully in ${acc.AccountNumber}.`)
  }
}


export { SavingsClass, DebitClass, DebitInterface, SavingsInterface, TransactionType }
