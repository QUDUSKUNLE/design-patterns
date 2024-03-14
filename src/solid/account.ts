

interface Accounts {
  savings(): void;
  debits(): void;
}

interface Borrow {
  lend(): void;
}

class SavingsAccounts implements Accounts {
  savings (): void {
    throw new Error( "Method not implemented." );
  }
  debits (): void {
    throw new Error( "Method not implemented." );
  }
}

class CurrentAccounts implements Accounts, Borrow {
  lend (): void {
    throw new Error( "Method not implemented." );
  }
  savings (): void {
    throw new Error( "Method not implemented." );
  }
  debits (): void {
    throw new Error( "Method not implemented." );
  }
}
