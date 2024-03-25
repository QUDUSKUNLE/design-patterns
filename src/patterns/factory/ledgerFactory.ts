import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { CreateRepositoryTransactionFactory, RepositoryType } from './repositoryFactory';

export enum TransactionsEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  LOAN = 'LOAN',
  PURCHASE = 'PURCHASE',
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
}

export interface LedgerInterface {
  TransactionID: string
  AccountID: string;
  TransferBankID: string;
  TransactionType: TransactionsEnum,
  Status: TransactionStatus;
  Amount: number;
  LedgerCreatedAt: Date;
  LedgerUpdatedAt: Date;
  ReceiverID?: string;
  ReceiverBankID?: string;
}

interface TransactionReference {
  GenerateLedgerTransactionID(): string
}

export interface LedgerTransactions<T> extends TransactionReference {
  DebitLedger(ok: T): void;
  CreditLedger(ok: T): void;
  LendLedger(ok: T): void;
  BorrowLedger(ok: T): void;
  PurchaseLedger(ok: T): void;
  ApproveBorrowsLedger(ok: T): void;
}

abstract class LedgerTransactionFactory {
  public abstract FactoryMethod(): LedgerTransactions<LedgerInterface>
}

class LedgerTransactionReference implements TransactionReference{
  constructor(private transaction: boolean) {}
  GenerateLedgerTransactionID(): string {
    if (this.transaction) return randomUUID()
    throw new Error('No transaction takes place.');
  }
}

class LedgerTrasctionsFactory extends LedgerTransactionReference implements LedgerTransactions<LedgerInterface> {
  private ledger: LedgerInterface[] = []
  private database: string = 'transactionLedger.json';
  private repositoryFactory: CreateRepositoryTransactionFactory = new CreateRepositoryTransactionFactory({ Host: '', Port: 1, Database: this.database, DatabaseType: RepositoryType.POSTGRES });
  private repository = this.repositoryFactory.FactoryMethod()
  constructor(transaction: boolean) {
    super(transaction);
    (() => {
      try {
        const data = fs.readFileSync(path.join(__dirname, this.database), 'utf8')
        this.ledger = JSON.parse(data);
      } catch (error) {}
    })()
  }
  ApproveBorrowsLedger(ok: LedgerInterface): void {
    this.ledger.push(ok);
    this.repository.Write(this.ledger);
  }
  BorrowLedger(ok: LedgerInterface): void {
    this.ledger.push(ok);
    this.repository.Write(this.ledger);
  }
  DebitLedger(ok: LedgerInterface): void {
    this.ledger.push(ok);
    this.repository.Write(this.ledger);
  }
  CreditLedger(ok: LedgerInterface): void {
    this.ledger.push(ok);
    this.repository.Write(this.ledger);
  }
  LendLedger(ok: LedgerInterface): void {
    this.ledger.push(ok);
    this.repository.Write(this.ledger);
  }
  PurchaseLedger(ok: LedgerInterface): void {
    this.ledger.push(ok);
    this.repository.Write(this.ledger);
  }
}

export class CreateLedgerTransactionFactory extends LedgerTransactionFactory {
  constructor(private transaction: boolean) {
    super();
  }
  public FactoryMethod(): LedgerTransactions<LedgerInterface> {
    return new LedgerTrasctionsFactory(this.transaction);
  }
}

function create(create: LedgerTransactionFactory) {
  const transaction = create.FactoryMethod();
  const ID = transaction.GenerateLedgerTransactionID();
    transaction.ApproveBorrowsLedger({
      TransactionID: ID,
      AccountID: '1',
      TransactionType: TransactionsEnum.CREDIT,
      TransferBankID: '2',
      Status: TransactionStatus.PENDING,
      Amount: 100,
      LedgerCreatedAt: new Date(),
      LedgerUpdatedAt: new Date(),
  })
}
