import fs from 'fs';
import path from 'path';
import * as cassandra from 'cassandra-driver';

export enum RepositoryType {
  MONGODB = 'mongodb',
  POSTGRES = 'pg',
  CASSANDRA = 'ca',
}

interface Repository {
  Host: string;
  Port: number;
  Database: string;
  DatabaseType: RepositoryType;
  Username?: string;
  Password?: string;
}

interface RepositoryTransactions {
  Read(): Promise<Record<string, unknown> | unknown[]>;
  Write(record: Record<string, unknown> | unknown[]): void;
  Edit(): void;
  Delete(): void;
}

abstract class RepositoryTransaction {
  public abstract FactoryMethod(): RepositoryTransactions;
}

class ConnectRepository {
  public database?: cassandra.Client;
  constructor(private connect: Repository) {
    (() => {
      if (this.connect.DatabaseType === RepositoryType.MONGODB) return;
      if (this.connect.DatabaseType === RepositoryType.CASSANDRA) {
        this.database = new cassandra.Client({
          contactPoints: ['h1', 'h2'],
          localDataCenter: 'datacenter1',
          keyspace: 'ks2',
        });
      }
    })();
  }
  // Connect database here
}

class RepositoryTransactionFactory
  extends ConnectRepository
  implements RepositoryTransactions
{
  constructor(private conn: Repository) {
    super(conn);
  }
  async Read(): Promise<Record<string, unknown> | unknown[]> {
    try {
      const data = fs.readFileSync(
        path.join(__dirname, this.conn.Database),
        'utf8',
      );
      return JSON.parse(data) as unknown as Record<string, unknown>;
    } catch (error) {
      throw error;
    }
  }
  Write(record: Record<string, unknown> | unknown[]): void {
    fs.writeFile(
      path.join(__dirname, this.conn.Database),
      JSON.stringify(record, null, 2),
      (error) => {
        if (error) {
        }
      },
    );
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
  public FactoryMethod(): RepositoryTransactions {
    return new RepositoryTransactionFactory(this.conn);
  }
}
