

interface Accounts {
  savings(): void;
  debits(): void;
}

interface Borrow {
  lend(): void;
}

class SavingsAccount implements Accounts {
  savings (): void {
    throw new Error( "Method not implemented." );
  }
  debits (): void {
    throw new Error( "Method not implemented." );
  }
}

class CurrentAccount implements Accounts, Borrow {
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
