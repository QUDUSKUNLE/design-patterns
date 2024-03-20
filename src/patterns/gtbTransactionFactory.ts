import fs from 'fs';
import path from 'path';

export interface Ledger {
  balance: number;
  name: string;
}

export interface Transaction {
  Debits(amount: number): void;
  Credit(amount: number): void;
  Lends(amount: number): void;
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
        const data = fs.readFileSync(path.join(__dirname, 'ledger.json'), 'utf8')
        this.ledger = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
    })()
    this.customer = this.ledger[this.accountNumber]
  }
  Debits(amount: number): void {
    if (this.customer) {
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
    throw new Error('Unknown customer.');
  }
  Credit(amount: number): void {
    this.customer.balance += amount;
    this.ledger[this.accountNumber] = this.customer;
    fs.writeFile(path.join(__dirname, 'ledger.json'), JSON.stringify(this.ledger, null, 2), (error) => {
      if (error) {}
      console.log('Data written successfully.');
    })
  }
  Lends(amount: number): string {
    throw new Error('Method not implemented.');
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
