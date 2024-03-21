import { randomUUID } from 'crypto';
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
  PAID = 'PAID'
}

enum PaymentSchedule {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

interface LendTransaction {
  TransactionID: string;
  LendID: string
  LendAmount: number;
  PaymentRate: number;
  BorrowerID: string;
  PaymentSchedule: PaymentSchedule;
  Status: LendStatus;
  Reference: string;
  CreatedAt: Date
  UpdatedAt: Date
  HavePaid?: number;
  PaidTimes?: number;
  ApprovedAmount?: number;
  Witnesses?: string[];
}

interface BorrowTransaction {
  TransactionID: string;
  BorrowerID?: string
  BorrowAmount: number;
  PaymentRate: number;
  LenderID: string;
  PaymentSchedule: PaymentSchedule;
  Status: LendStatus;
  Reference: string;
  CreatedAt: Date
  UpdatedAt: Date
  HavePaid?: number;
  PaidTimes?: number;
  ApprovedAmount?: number;
  Witnesses?: string[];
}

interface ApproveBorrows {
  TransactionID: string,
  LenderID: string,
  Status: LendStatus.APPROVED | LendStatus.DECLINED,
  ApprovedAmount?: number;
}

interface Transaction {
  Debits(amount: number): void;
  Credits(amount: number): void;
  Lends(lend: LendTransaction): void;
  Debts(lendStatus?: LendStatus): void;
  Borrows(borrowStatus?: LendStatus): void
  ApproveBorrows(approve: ApproveBorrows): void
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

  async ApproveBorrows(approve: ApproveBorrows): Promise<void> {
    if (this.accountNumber === approve.LenderID) {
      throw new Error('You can\'t approve your loan.')
    }
    await this.approveLends(approve);
    switch (approve.Status) {
      case LendStatus.APPROVED: {
        const lend = this.ledger[approve.LenderID].Lend.reduce<LendTransaction>((acc, prev) => {
          if (prev.TransactionID === approve.TransactionID) {
            [prev.Status, acc, prev.UpdatedAt, prev.ApprovedAmount] = [approve.Status, prev, new Date(), approve.ApprovedAmount];
          }
          return acc;
        }, {} as LendTransaction)
        if (lend.TransactionID) {
          this.ledger[approve.LenderID].Balance += lend.LendAmount;
        }
      }
      case LendStatus.DECLINED: {
        this.ledger[approve.LenderID].Lend.reduce<LendTransaction>((acc, prev) => {
          if (prev.TransactionID === approve.TransactionID) {
            [prev.Status, acc, prev.UpdatedAt] = [approve.Status, prev, new Date()];
          }
          return acc;
        }, {} as LendTransaction)
      }
      default: {
        this.writeDB()
      }
    }
  }

  Borrows(borrowStatus?: LendStatus): BorrowTransaction[] {
    if (borrowStatus) return this.customer.Borrow.reduce<BorrowTransaction[]>((acc, pre) => {
      if (pre.Status === borrowStatus) {
        acc.push(pre);
      }
      return acc
    }, [])
    return this.customer.Borrow
  }

  Debts(lendStatus?: LendStatus): LendTransaction[] {
    if (lendStatus) return this.customer.Lend.reduce<LendTransaction[]>((acc, pre) => {
      if (pre.Status === lendStatus) {
        acc.push(pre);
      }
      return acc
    }, [])
    return this.customer.Lend
  }

  Debits(amount: number): void {
    if (this.customer && this.customer.Balance > amount) {
      this.customer.Balance -= amount;
      this.ledger[this.accountNumber] = this.customer;
      this.writeDB()
    }
    throw new Error('Unknown customer.');
  }

  Credits(amount: number): void {
    this.customer.Balance += amount;
    this.ledger[this.accountNumber] = this.customer;
    this.writeDB()
  }

  async Lends(lend: LendTransaction): Promise<void> {
    if (this.accountNumber === lend.BorrowerID) throw new Error(
      'You can\'t lend yourself money.')
    if (this.customer && this.customer.Balance >= 5000) {
      [lend.PaidTimes, lend.HavePaid] = [0, 0];
      this.ledger[this.accountNumber].Lend.push(lend);
      this.ledger[this.accountNumber] = this.customer;
      const borrow: BorrowTransaction = {
        TransactionID: lend.TransactionID,
        BorrowerID: lend.BorrowerID,
        LenderID: this.accountNumber,
        BorrowAmount: lend.LendAmount,
        PaymentRate: lend.PaymentRate,
        PaymentSchedule: lend.PaymentSchedule,
        Status: lend.Status,
        Reference: lend.Reference,
        CreatedAt: lend.CreatedAt,
        UpdatedAt: lend.UpdatedAt,
      }
      await this.borrow(borrow);
      this.writeDB()
    }
    throw new Error('Authorized to perform this transaction')
  }

  private borrow(borrow: BorrowTransaction): boolean {
    const borrowerID = borrow?.BorrowerID as string
    const borrower = this.ledger[borrowerID];
    if (borrower && borrower.Balance <= borrow.BorrowAmount) throw new Error(
      'The borrower can\'t afford this amount at the moment.')
    delete borrow.BorrowerID;
    if (this.filterBorrower(borrower.Borrow, borrow.LenderID)) throw new Error(
      'You have a pending request from this lender.')
    this.ledger[borrowerID].Borrow.push(borrow)
    this.ledger[borrowerID] = borrower;
    this.writeDB()
    return true;
  }

  private filterBorrower(
    borrow: BorrowTransaction[],
    lenderID: string
  ): boolean {
    return borrow.reduce<boolean>((acc, prev) => {
      if (prev.LenderID === lenderID && prev.Status === LendStatus.PENDING) {
        acc = true
      }
      return acc;
    }, false)
  }

  private approveLends(app: ApproveBorrows): boolean {
    let result = false;
    switch (app.Status) {
      case LendStatus.DECLINED:
        result = this.customer.Borrow.reduce<boolean>((acc, pre) => {
          if (pre.TransactionID === app.TransactionID && pre.Status === LendStatus.PENDING) {
            [pre.Status, acc, pre.UpdatedAt] = [app.Status, true, new Date()];
          }
          return acc;
        }, false);
      case LendStatus.APPROVED:
        result = this.customer.Borrow.reduce<boolean>((acc, pre) => {
          if (pre.TransactionID === app.TransactionID && pre.Status === LendStatus.PENDING) {
            [pre.Status, acc, pre.ApprovedAmount, pre.UpdatedAt] = [app.Status, true, app.ApprovedAmount, new Date()];
          }
          return acc;
        }, false);
        this.customer.Balance -= app.ApprovedAmount ? app.ApprovedAmount : 0;
      default:
        if (result) {
          this.ledger[this.accountNumber] = this.customer;
          this.writeDB()
        }
    }
    return result;
  }

  private writeDB(): void {
    fs.writeFile(
      path.join(__dirname, 'ledger.json'),
      JSON.stringify(this.ledger, null, 2), (error) => {
      if (error) {}
    })
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
  // transact.Lends({
  //   TransactionID: randomUUID(),
  //   LendAmount: 10000,
  //   PaymentRate: 100,
  //   BorrowerID: 's234557',
  //   LendID: '1',
  //   Status: LendStatus.PENDING,
  //   PaymentSchedule: PaymentSchedule.DAILY,
  //   Reference: 'I would like to lend 1000 from you',
  //   CreatedAt: new Date(),
  //   UpdatedAt: new Date(),
  // })
  // transact.ApproveBorrows({
  //   TransactionID: '19b55890-2f77-474b-ad8b-26042288c064',
  //   LenderID: 's779561',
  //   ApprovedAmount: 10000,
  //   Status: LendStatus.DECLINED,
  // })
  // console.log(transact.Debts(LendStatus.DECLINED))
}

// create(new CreateCustomerTransaction('s779561'))
