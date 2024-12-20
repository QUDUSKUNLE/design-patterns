import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import {
  CreateLedgerTransactionFactory,
  LedgerInterface,
  LedgerTransactions,
  TransactionsEnum,
  TransactionStatus,
} from './ledgerFactory';
import {
  CreateRepositoryTransactionFactory,
  RepositoryType,
} from './repositoryFactory';

export interface Ledger {
  Balance: number;
  Name: string;
  Lend: LendTransaction[];
  Borrow: BorrowTransaction[];
  LendBorrowRepayment?: LendRepaymentType;
}

enum LendStatus {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  PAID = 'PAID',
}

enum PaymentSchedule {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

interface LendBorrowTransaction {
  TransactionID: string;
  PaymentRate: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  PaymentSchedule: PaymentSchedule;
  Status: LendStatus;
  RepaymentID?: string;
  HavePaid?: number;
  PaidTimes?: number;
  Reference: string;
  ApprovedAmount?: number;
  Witnesses?: string[];
}

interface LendTransaction extends LendBorrowTransaction {
  LendAmount: number;
  LenderID: string;
  BorrowerID: string;
}

interface BorrowTransaction extends LendBorrowTransaction {
  BorrowAmount: number;
  LenderID: string;
  BorrowerID?: string;
}


interface LendRepayment extends Omit<Required<LendBorrowTransaction>, 'PaymentSchedule' | 'Status' | 'Witnesses'> {
  FullyPaid: boolean;
}

type LendRepaymentType = {
  [Property in keyof Pick<Required<LendBorrowTransaction>, 'RepaymentID'>]: LendRepayment[]
}


interface ApproveBorrows {
  TransactionID: string;
  LenderID: string;
  Status: LendStatus.APPROVED | LendStatus.DECLINED;
  ApprovedAmount?: number;
}

interface Transaction {
  Debits(amount: number): void;
  Credits(amount: number): void;
  Lends(lend: LendTransaction): void;
  Debts(lendStatus?: LendStatus): void;
  Borrows(borrowStatus?: LendStatus): void;
  ApproveBorrows(approve: ApproveBorrows): void;
  Repayment(repayment: LendRepayment): void;
}

abstract class CustomerTransaction {
  public abstract FactoryMethod(): Transaction;
}

class CreateCustomerTransactions implements Transaction {
  private customer: Ledger;
  private database: string = 'ledger.json';
  private ledger: Record<string, Ledger> = {};
  private ledgerFactory: CreateLedgerTransactionFactory =
    new CreateLedgerTransactionFactory(true);
  private logLedger = <LedgerTransactions>this.ledgerFactory.FactoryMethod();
  private repositoryFactory: CreateRepositoryTransactionFactory =
    new CreateRepositoryTransactionFactory({
      Host: '',
      Port: 1,
      Database: this.database,
      DatabaseType: RepositoryType.POSTGRES,
    });
  private repository = this.repositoryFactory.FactoryMethod();

  constructor(private accountNumber: string) {
    (() => {
      try {
        const data = fs.readFileSync(
          path.join(__dirname, this.database),
          'utf8',
        );
        this.ledger = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
    })();
    this.customer = this.ledger[this.accountNumber];
  }

  Repayment(repayment: LendRepayment): void {
    throw new Error('Method not implemented.');
  }

  async ApproveBorrows(approve: ApproveBorrows): Promise<void> {
    if (this.accountNumber === approve.LenderID) {
      throw new Error('You can\'t approve your loan.');
    }
    const repaymentID = this.logLedger.GenerateLedgerTransactionID();
    await this.approveLends(approve, repaymentID);
    switch (approve.Status) {
      case LendStatus.APPROVED: {
        const lend = this.ledger[approve.LenderID].Lend.reduce<LendTransaction>(
          (acc, prev) => {
            if (prev.TransactionID === approve.TransactionID) {
              [prev.Status, acc, prev.UpdatedAt, prev.ApprovedAmount, prev.RepaymentID] = [
                approve.Status,
                prev,
                new Date(),
                approve.ApprovedAmount,
                repaymentID,
              ];
            }
            return acc;
          },
          {} as LendTransaction,
        );
        if (lend.TransactionID) {
          this.ledger[approve.LenderID].Balance += lend.LendAmount;
        }
      }
      case LendStatus.DECLINED: {
        this.ledger[approve.LenderID].Lend.reduce<LendTransaction>(
          (acc, prev) => {
            if (prev.TransactionID === approve.TransactionID) {
              [prev.Status, acc, prev.UpdatedAt] = [
                approve.Status,
                prev,
                new Date(),
              ];
            }
            return acc;
          },
          {} as LendTransaction,
        );
      }
      default: {
        this.repository.Write(this.ledger);
      }
    }
  }

  Borrows(borrowStatus?: LendStatus): BorrowTransaction[] {
    if (borrowStatus)
      return this.customer.Borrow.reduce<BorrowTransaction[]>((acc, pre) => {
        if (pre.Status === borrowStatus) acc.push(pre);
        return acc;
      }, []);
    return this.customer.Borrow;
  }

  Debts(lendStatus?: LendStatus): LendTransaction[] {
    if (lendStatus)
      return this.customer.Lend.reduce<LendTransaction[]>((acc, pre) => {
        if (pre.Status === lendStatus) acc.push(pre);
        return acc;
      }, []);
    return this.customer.Lend;
  }

  Debits(amount: number): void {
    if (this.customer && this.customer.Balance >= amount) {
      this.customer.Balance -= amount;
      this.ledger[this.accountNumber] = this.customer;
      this.repository.Write(this.ledger);
      const ID = this.logLedger.GenerateLedgerTransactionID();
      this.logLedger.WriteLedger({
        TransactionID: ID,
        AccountID: this.accountNumber,
        TransactionType: TransactionsEnum.DEBIT,
        TransferBankID: '2',
        Status: TransactionStatus.PENDING,
        Amount: amount,
        LedgerCreatedAt: new Date(),
        LedgerUpdatedAt: new Date(),
      });
      return;
    }
    throw new Error('Unknown customer.');
  }

  Credits(amount: number): void {
    this.customer.Balance += amount;
    this.ledger[this.accountNumber] = this.customer;
    this.repository.Write(this.ledger);
    const ID = this.logLedger.GenerateLedgerTransactionID();
    this.logLedger.WriteLedger({
      TransactionID: ID,
      AccountID: this.accountNumber,
      TransactionType: TransactionsEnum.CREDIT,
      TransferBankID: '2',
      Status: TransactionStatus.PENDING,
      Amount: amount,
      LedgerCreatedAt: new Date(),
      LedgerUpdatedAt: new Date(),
    });
  }

  async Lends(lend: LendTransaction): Promise<void> {
    if (this.accountNumber === lend.BorrowerID)
      throw new Error('You can\'t lend yourself money.');
    // Customer can lend money if a customer has more than 5000 in the account
    if (this.customer && this.customer.Balance >= 5000) {
      [lend.PaidTimes, lend.HavePaid] = [0, 0];
      this.ledger[this.accountNumber].Lend.push(lend);
      this.ledger[this.accountNumber] = this.customer;
      const borrow: BorrowTransaction = {
        ...lend,
        BorrowAmount: lend.LendAmount,
        LenderID: this.accountNumber,
      };
      await this.borrow(borrow);
      this.repository.Write(this.ledger);
      return
    }
    throw new Error('Authorized to perform this transaction');
  }

  private borrow(borrow: BorrowTransaction): boolean {
    const borrowerID = borrow?.BorrowerID as string;
    const borrower = this.ledger[borrowerID];
    if (borrower && borrower.Balance <= borrow.BorrowAmount)
      throw new Error('The borrower can\'t afford this amount at the moment.');
    delete borrow.BorrowerID;
    if (this.filterBorrower(borrower.Borrow, borrow.LenderID))
      throw new Error('You have a pending request from this lender.');
    this.ledger[borrowerID].Borrow.push(borrow);
    this.ledger[borrowerID] = borrower;
    this.repository.Write(this.ledger);
    return true
  }

  private filterBorrower(
    borrow: BorrowTransaction[],
    lenderID: string,
  ): boolean {
    return borrow.reduce<boolean>((acc, prev) => {
      if (prev.LenderID === lenderID && prev.Status === LendStatus.PENDING) {
        acc = true;
      }
      return acc;
    }, false);
  }

  private approveLends(app: ApproveBorrows, repaymentID?: string): boolean {
    let result = false;
    switch (app.Status) {
      case LendStatus.DECLINED:
        result = this.customer.Borrow.reduce<boolean>((acc, pre) => {
          if (
            pre.TransactionID === app.TransactionID &&
            pre.Status === LendStatus.PENDING
          ) {
            [pre.Status, acc, pre.UpdatedAt] = [app.Status, true, new Date()];
          }
          return acc;
        }, false);
      case LendStatus.APPROVED:
        result = this.customer.Borrow.reduce<boolean>((acc, pre) => {
          if (
            pre.TransactionID === app.TransactionID &&
            pre.Status === LendStatus.PENDING
          ) {
            [pre.Status, acc, pre.ApprovedAmount, pre.UpdatedAt, pre.RepaymentID] = [
              app.Status,
              true,
              app.ApprovedAmount,
              new Date(),
              repaymentID,
            ];
          }
          return acc;
        }, false);
        this.customer.Balance -= app.ApprovedAmount ? app.ApprovedAmount : 0;
      default:
        if (result) {
          this.ledger[this.accountNumber] = this.customer;
          this.repository.Write(this.ledger);
        }
    }
    return result;
  }
}

export class CreateCustomerTransaction extends CustomerTransaction {
  constructor(private readonly accountNumber: string) {
    super();
  }
  public FactoryMethod(): Transaction {
    return new CreateCustomerTransactions(this.accountNumber);
  }
}

function create(transaction: CustomerTransaction): void {
  const transact = transaction.FactoryMethod();
  // transact.Lends({
  //   TransactionID: randomUUID(),
  //   LendAmount: 10000,
  //   PaymentRate: 100,
  //   BorrowerID: 'c887811',
  //   LenderID: '1',
  //   Status: LendStatus.PENDING,
  //   PaymentSchedule: PaymentSchedule.DAILY,
  //   Reference: 'I would like to lend 1000 from you',
  //   CreatedAt: new Date(),
  //   UpdatedAt: new Date(),
  // })
  // transact.ApproveBorrows({
  //   TransactionID: 'e59bf486-15fc-4553-92f0-76a26f01dfd7',
  //   LenderID: 's310745',
  //   ApprovedAmount: 10000,
  //   Status: LendStatus.APPROVED,
  // })
  // console.log(transact.Borrows(LendStatus.APPROVED))
  // const borrow = transact.Lends()
  // console.log(borrow)
  // transact.Credits(50000);
}

create(new CreateCustomerTransaction('c887811'));
