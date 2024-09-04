interface UserName {
  id: string;
  user: {
    info: {
      email?: string;
      phoneNumber?: string;
    }
  }
}

const user = {
  id: '123',
  user: {
    info: {
      email: 'quduskunle@gmail.com'
    }
  }
}

// Function Type Expressions
type GreetFunction = (user: UserName) => string;

function greeter(fn: GreetFunction) {
  return fn(user);
}

const printToConsole = (user: UserName) => user.id;

greeter(printToConsole);

// Function Call Signatures
type DescribableFunction = {
  description: string
  key: (arg: number) => boolean;
}

const doSomething = (func: DescribableFunction) => console.log(`${func.description} returned ${func.key(6)}`);


// Function Construct Signatures
type SomeConstructor = {
  new (str: string): string;
};

const func = (ctor: SomeConstructor) => new ctor('Hello');

interface CallOrConstruct {
  new (str: string): Date;
  (num?: number): number;
}

// Generic Functions
const firstElement = (arr: unknown[]) => arr[0];
const first = <T>(arr: T[]) => arr[0];

// Constraints
const longest = <T extends { length: number }>(aa: T, bb: T) => aa.length >= bb.length ? aa : bb;
console.log(longest('hello', 'world'));
