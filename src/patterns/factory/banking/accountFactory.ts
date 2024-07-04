import { randomInt } from "crypto";
import fs from "fs";
import path from "path";
import { Ledger } from "./transactionFactory";
import {
  CreateRepositoryTransactionFactory,
  RepositoryType,
} from "./repositoryFactory";

interface AccountName {
  AccountName(): string;
}

interface SaveAccount {
  SaveAccount(accountNumber: string[], accountName: string): void;
}

export interface SavingsAccount {
  SavingsAccountNumber(): string;
}

export interface CurrentsAccount {
  CurrentsAccountNumber(): string;
}

enum ACCOUNTTYPE {
  SAVINGS = "SAVINGS",
  CURRENTS = "CURRENTS",
}

interface Account {
  accountName: string;
  savingAccount: string;
  currentAccount?: string;
}

interface CustomerSavingsInterface
  extends AccountName,
    SaveAccount,
    SavingsAccount {}
interface CustomerCurrentsInterface
  extends CustomerSavingsInterface,
    CurrentsAccount {}

abstract class CustomerAccountsFactory {
  public abstract FactoryMethod():
    | CustomerSavingsInterface
    | CustomerCurrentsInterface;
}

abstract class CustomerAccountName {
  private database: string = "ledger.json";
  private ledger: Record<string, Ledger> = {};
  private repositoryFactory: CreateRepositoryTransactionFactory =
    new CreateRepositoryTransactionFactory({
      Host: "",
      Port: 1,
      Database: this.database,
      DatabaseType: RepositoryType.POSTGRES,
    });
  private repository = this.repositoryFactory.FactoryMethod();
  constructor(
    private firstName: string,
    private lastName: string,
  ) {
    (() => {
      try {
        const data = fs.readFileSync(
          path.join(__dirname, this.database),
          "utf8",
        );
        this.ledger = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  AccountName(): string {
    return `${this.firstName.toLowerCase()} ${this.lastName.toUpperCase()}`;
  }

  SaveAccount(accountNumber: string[], accountName: string): void {
    this.ledger = accountNumber.reduce((acc, prev) => {
      this.ledger[prev] = {
        Balance: 0,
        Name: accountName,
        Lend: [],
        Borrow: [],
      };
      return this.ledger;
    }, this.ledger);
    this.repository.Write(this.ledger);
  }
}

class CustomerSavingsFactory
  extends CustomerAccountName
  implements CustomerSavingsInterface
{
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
  SavingsAccountNumber(): string {
    return `s${randomInt(1234567)}`;
  }
}

class CustomerCurrentFactory
  extends CustomerSavingsFactory
  implements CustomerCurrentsInterface
{
  constructor(firstName: string, lastName: string) {
    super(firstName, lastName);
  }
  CurrentsAccountNumber(): string {
    return `c${randomInt(1234567)}`;
  }
}

export class CreateCustomerAccounts extends CustomerAccountsFactory {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private accountType: ACCOUNTTYPE,
  ) {
    super();
  }
  public FactoryMethod(): CustomerSavingsInterface | CustomerCurrentsInterface {
    if (this.accountType === ACCOUNTTYPE.SAVINGS)
      return new CustomerSavingsFactory(this.firstName, this.lastName);
    return new CustomerCurrentFactory(this.firstName, this.lastName);
  }
}

function create(gtb: CustomerAccountsFactory, ENUMS: ACCOUNTTYPE): Account {
  switch (ENUMS) {
    case ACCOUNTTYPE.CURRENTS:
      const current = <CustomerCurrentsInterface>gtb.FactoryMethod();
      const account = {
        accountName: current.AccountName(),
        savingAccount: current.SavingsAccountNumber(),
        currentAccount: current.CurrentsAccountNumber(),
      };
      current.SaveAccount(
        [account.savingAccount, account.currentAccount],
        account.accountName,
      );
      return { ...account };
  }
  const savings = <CustomerSavingsInterface>gtb.FactoryMethod();
  const account = {
    accountName: savings.AccountName(),
    savingAccount: savings.SavingsAccountNumber(),
  };
  savings.SaveAccount([account.savingAccount], account.accountName);
  return { ...account };
}

const gtb = new CreateCustomerAccounts(
  "Abdul-Muhsin",
  "Abdul-Quddus",
  ACCOUNTTYPE.CURRENTS,
);
const accounts = create(gtb, ACCOUNTTYPE.CURRENTS);
console.log(accounts);
