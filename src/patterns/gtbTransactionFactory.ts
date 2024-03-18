import fs from 'fs';
import path from 'path';

export interface Ledger {
  balance: number;
  name: string;
}

export interface Transaction {
  debits(amount: number): void;
  credit(amount: number): void;
  lends(amount: number): void;
}

abstract class CustomerTransaction {
  public abstract factoryMethod(): Transaction;
}

class CreateCustomerTransactions implements Transaction {
  private customer: Ledger;
  private ledger: Record<string, Ledger> = {}
  constructor(private accountNumber: string) {
    (() => {
      try {
        const data = fs.readFileSync(path.join(__dirname, 'ledger.json'), 'utf8')
        this.ledger = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
    })()
    this.customer = this.ledger[this.accountNumber]
  }
  debits(amount: number): void {
    if (this.customer.balance < amount) {
      console.log(`Your balance is ${this.customer.balance}`);
      throw new Error('Insufficient balance.')
    }
    this.customer.balance -= amount;
    this.ledger[this.accountNumber] = this.customer;
    fs.writeFile(path.join(__dirname, 'ledger.json'), JSON.stringify(this.ledger, null, 2), (error) => {
      if (error) {}
      console.log('Data written successfully.');
    })
  }
  credit(amount: number): void {
    this.customer.balance += amount;
    this.ledger[this.accountNumber] = this.customer;
    fs.writeFile(path.join(__dirname, 'ledger.json'), JSON.stringify(this.ledger, null, 2), (error) => {
      if (error) {}
      console.log('Data written successfully.');
    })
  }
  lends(amount: number): string {
    throw new Error('Method not implemented.');
  }
}

class CreateCustomerTransaction extends CustomerTransaction {
  constructor(private readonly accountNumber: string) {
    super()
  }
  public factoryMethod(): Transaction {
    return new CreateCustomerTransactions(this.accountNumber)
  }
}

function create(savings: CustomerTransaction) {
  const saving = savings.factoryMethod();
  saving.debits(50000);
}

create(new CreateCustomerTransaction('s779561'))
