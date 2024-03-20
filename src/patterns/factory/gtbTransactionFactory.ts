import fs from 'fs';
import path from 'path';

interface Ledger {
  Balance: number;
  Name: string;
  Lend: LendTransaction[]
  Borrow: BorrowTransaction[]
}

enum LendStatus {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
}

enum PaymentSchedule {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

interface LendTransaction {
  LendID: string
  LendAmount: number;
  PaymentRate: number;
  BorrowerID: string;
  PaymentSchedule: PaymentSchedule;
  Status: LendStatus;
  Reference: string;
  HavePaid?: number;
  PaidTimes?: number;
}

interface BorrowTransaction {
  BorrowerID?: string
  BorrowAmount: number;
  PaymentRate: number;
  LenderID: string;
  PaymentSchedule: PaymentSchedule;
  Status: LendStatus;
  Reference: string;
  HavePaid?: number;
  PaidTimes?: number;
}

interface Transaction {
  Debits(amount: number): void;
  Credit(amount: number): void;
  Lend(lend: LendTransaction): void;
  Borrow(borrow: BorrowTransaction): boolean;
}

abstract class CustomerTransaction {
  public abstract FactoryMethod(): Transaction;
}

class CreateCustomerTransactions implements Transaction {
  private customer: Ledger;
  private ledger: Record<string, Ledger> = {}
  constructor(private accountNumber: string) {
    (() => {
      try {
        const data = fs.readFileSync(
          path.join(__dirname, 'ledger.json'),
          'utf8'
        )
        this.ledger = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
    })()
    this.customer = this.ledger[this.accountNumber]
  }
  Borrow(borrow: BorrowTransaction): boolean {
    const borrowerID = borrow?.BorrowerID as string
    const borrower = this.ledger[borrowerID];
    if (borrower && borrower.Balance < borrow.BorrowAmount) throw new Error(
      'The borrower can\'t afford the amount at the moment.')
    delete borrow.BorrowerID;
    if (this.FilterBorrower(borrower.Borrow, borrow.LenderID)) throw new Error(
      'You have a pending request from this lender.')
    this.ledger[borrowerID].Borrow.push(borrow)
    this.ledger[borrowerID] = borrower;
    fs.writeFile(
      path.join(__dirname, 'ledger.json'),
      JSON.stringify(this.ledger, null, 2), (error) => {
      if (error) {
        throw new Error(`Error lending money from ${borrowerID}`);
      }
    })
    return true;
  }
  Debits(amount: number): void {
    if (this.customer && this.customer.Balance > amount) {
      this.customer.Balance -= amount;
      this.ledger[this.accountNumber] = this.customer;
      fs.writeFile(
        path.join(__dirname, 'ledger.json'),
        JSON.stringify(this.ledger, null, 2), (error) => {
        if (error) {}
      })
      return;
    }
    throw new Error('Unknown customer.');
  }
  Credit(amount: number): void {
    this.customer.Balance += amount;
    this.ledger[this.accountNumber] = this.customer;
    fs.writeFile(
      path.join(__dirname, 'ledger.json'),
      JSON.stringify(this.ledger, null, 2), (error) => {
      if (error) {}
    })
    return;
  }
  async Lend(lend: LendTransaction): Promise<void> {
    if (this.customer && this.customer.Balance >= 5000) {
      [lend.PaidTimes, lend.HavePaid] = [0, 0];
      this.ledger[this.accountNumber].Lend.push(lend);
      this.ledger[this.accountNumber] = this.customer;
      const borrow: BorrowTransaction = {
        BorrowerID: lend.BorrowerID,
        LenderID: this.accountNumber,
        BorrowAmount: lend.LendAmount,
        PaymentRate: lend.PaymentRate,
        PaymentSchedule: lend.PaymentSchedule,
        Status: lend.Status,
        Reference: lend.Reference,
      }
      await this.Borrow(borrow);
      fs.writeFile(
        path.join(__dirname, 'ledger.json'),
        JSON.stringify(this.ledger, null, 2), (error) => {
        if (error) {}
      })
      return;
    }
    throw new Error('Authorized to perform this transaction')
  }

  private FilterBorrower(
    borrow: BorrowTransaction[],
    lenderID: string
  ): boolean {
    return borrow.reduce<boolean>((_acc, prev) => {
      if (prev.LenderID === lenderID && prev.Status === LendStatus.PENDING) return true
      return false;
    }, false)
  }
}

export class CreateCustomerTransaction extends CustomerTransaction {
  constructor(private readonly accountNumber: string) {
    super()
  }
  public FactoryMethod(): Transaction {
    return new CreateCustomerTransactions(this.accountNumber)
  }
}

function create(transaction: CustomerTransaction) {
  const transact = transaction.FactoryMethod();
  transact.Lend({
    LendAmount: 1000,
    PaymentRate: 100,
    BorrowerID: 's234556',
    LendID: '1',
    Status: LendStatus.PENDING,
    PaymentSchedule: PaymentSchedule.DAILY,
    Reference: 'I would like to lend 1000 from you',
  })
}

create(new CreateCustomerTransaction('s779561'))
