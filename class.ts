class Base {
  greet() {
    return "Hello, Qudus Yekeen";
  }
}

class Greater extends Base {
  readonly name: string = "Hello World";
  public constructor(otherName?: string) {
    super();
    this.name = otherName ?? this.name;
  }

  state = () => {
    return this.name;
  };

  greet(otherName?: string) {
    const result = otherName ?? super.greet();
    return result;
  }
}

interface CustomerDetail {
  name: string;
  balance: number;
}

type CustomerDetails = {
  [key: string]: CustomerDetail;
}

abstract class Bank {
  private readonly customerDetails: CustomerDetails[] = [];

  protected customerName(num: string): string {
    const customer = this.customerDetails.find((customer: CustomerDetails) => customer[num])
    return customer ? customer[num].name : 'Not Found';
  }

  protected customerBalance(num: string): number {
    const customer = this.customerDetails.find((customer: CustomerDetails) => customer[num])
    return customer ? customer[num].balance : 0;
  }
}

class Customer extends Bank {
  public constructor(private numbe: number) {
    super();
  }

  public getCustomerName() {
    return super.customerName(`${this.numbe}`);
  }

  public getCustomerBalance() {
    return super.customerBalance(`${this.numbe}`);
  }
}
