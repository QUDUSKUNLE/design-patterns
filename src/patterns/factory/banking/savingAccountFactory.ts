
type AccountDetails = {
  accountNumber: string;
  accountName: string
}

interface SaveAccount {
  Account(account: AccountDetails): void
  ViewAccount(): void
}

abstract class SaveAccountTransaction {
  public abstract factoryMethod(): SaveAccount
}

class CreateSaveAccountTransaction implements SaveAccount {
  Account (account: AccountDetails): void {
    throw new Error("Method not implemented.");
  }
  ViewAccount(): void {
    throw new Error("Method not implemented.");
  }
  
}
