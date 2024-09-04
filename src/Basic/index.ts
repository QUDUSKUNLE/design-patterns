import { loader, RecordHandler } from './ft';

type Listener<T> = (event: T) => void;

function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = [];
  return {
    subscribe: (listener: Listener<EventType>): () => void => {
      listeners.push(listener);
      return () => listeners = listeners.filter(list => list !== listener)
    },
    publish: (event: EventType) => listeners.forEach(listener => listener(event))
  }
}

interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

interface Pokemon {
  id: string;
  attach: number;
  defence: number;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;
  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;
  visit(visitor: (item: T) => void): void;
}

// Factory pattern
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {}
    static instance: InMemoryDatabase = new InMemoryDatabase()
    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();
    private constructor() {}
    /**
     * @param  {T} newValue
     * @returns void
     */
    public set(newValue: T): void {
      this.beforeAddListeners.publish({ newValue, value: this.db[newValue.id] })
      this.db[newValue.id] = newValue;
      this.afterAddListeners.publish({ value: newValue })
    }
  
    /**
     * @param  {string} id
     * @returns T
     */
    public get(id: string): T | undefined {
      return this.db[id]
    }
  
    /**
     * @param  {Listener<BeforeSetEvent<T>>} listener
     */
    public onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);

    }

    /**
     * @param  {Listener<AfterSetEvent<T>>} listener
     */
    public onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

    public visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor)
    }
    
    // strategy pattern
    /**
     * @param  {(item:T)=>number} scoreStrategy
     * @returns T
     */
    public selectBest(scoreStrategy: (item: T) => number): T | undefined {
      const found: {
        max: number,
        item: T | undefined
      } = {
        max: 0,
        item: undefined
      }

      Object.values(this.db).reduce((f, item) => {
        const score = scoreStrategy(item)
        if (score > f.max) {
          f.max = score;
          f.item = item;
        }
        return f;
      }, found)

      return found.item
    }
  }
  // Singleton
  return InMemoryDatabase
}

const pokemonDb = createDatabase<Pokemon>();

class PokemonAdaptor implements RecordHandler<Pokemon> {
  addRecord(record: Pokemon) {
    pokemonDb.instance.set(record);
  }
}

// Adaptor pattern
loader('./data.json', new PokemonAdaptor())

// const pokemonDb = new PokemonDB()
pokemonDb.instance.set({
  id: 'Bulbasavi',
  attach: 13,
  defence: 20
});

pokemonDb.instance.onAfterAdd(({ value }) => console.log(value));

pokemonDb.instance.set({
  id: 'Spinosaur',
  attach: 100,
  defence: 20
});

pokemonDb.instance.visit(item => console.log(item.id))
const bestDefensive = pokemonDb.instance.selectBest(({ defence }) => defence);
const bestAttach = pokemonDb.instance.selectBest(({ attach }) => attach);
