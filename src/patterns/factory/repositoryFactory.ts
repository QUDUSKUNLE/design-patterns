
enum RepositoryType {
  MONGODB = 'mongodb',
  POSTGRES = 'pg'
}

interface Repository {
  Host: string;
  Port: number;
  Database: string;
  DatabaseType: RepositoryType
  Username?: string;
  Password?: string;
}

interface RepositoryTransactions {
  Read(): void;
  Write(): void;
  Edit(): void;
  Delete(): void;
}

abstract class RepositoryTransaction {
  public abstract FactoryMethod(): RepositoryTransactions;
}

class ConnectRepository {
  constructor(private connect: Repository) {
    (() => {
      if (this.connect.DatabaseType === RepositoryType.MONGODB) return;
    })()
  }
  // Connect database here
}

class RepositoryTransactionFactory extends ConnectRepository implements RepositoryTransactions {
  constructor(private conn: Repository) {
    super(conn)
  }
  Read(): void {
    throw new Error('Method not implemented.');
  }
  Write(): void {
    throw new Error('Method not implemented.');
  }
  Edit(): void {
    throw new Error('Method not implemented.');
  }
  Delete(): void {
    throw new Error('Method not implemented.');
  }
}

export class CreateRepositoryTransactionFactory extends RepositoryTransaction {
  constructor(private conn: Repository) {
    super();
  }
  public FactoryMethod (): RepositoryTransactions {
    return new RepositoryTransactionFactory(this.conn)
  }
}
