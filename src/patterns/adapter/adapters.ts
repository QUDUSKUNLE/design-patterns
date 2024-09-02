/**
 * Abstract factory pattern is a creational pattern whihc provides you with an interface for creating families of related objects without specifying their concreate classes
 * 
 */

interface Iphone {
  useLightning(): void;
}

interface Android {
  useMicroUSB(): void
}

class Iphones implements Iphone {
  useLightning(): void {
    throw new Error("Method not implemented.");
  }
}

class Androids implements Android {
  useMicroUSB(): void {
    throw new Error("Method not implemented.");
  }
}

class LightningToMicroUSBAdapter implements Android {
  iphoneDevice: Iphone;
  
  constructor(iphone: Iphone) {
    this.iphoneDevice = iphone;
  }

  public useMicroUSB(): void {
    throw new Error("Method not implemented.");
  }
}

/** 1
 * Define an abstract interface for each object
 * An example, we have two kind of objects
*/
interface Order {
  id?: number;
  addProduct(productId: string): void;
  addShippingAddress(address: string): void;
}

interface Payment {
  addCreditCardNumber(ccNumber: number): void
  completePayment(order: Order): boolean;
}

/** 2
 * Define all the variants of each object. These variants will implement the interfaces defined above
*/
class OnlineOrder implements Order {
  id: number;
  addProduct(productId: string): void {
    console.log(`Product ${productId} added to the online order`)
  }
  addShippingAddress(address: string): void {
    console.log(`Shipping address ${address} added to the online order`)
  }
  constructor(id: number) {
    this.id = id
  }
}

class OnlinePayment implements Payment {
  private creditCardNumber?: number
  addCreditCardNumber(ccNumber: number): void {
    this.creditCardNumber = ccNumber;
    console.log(`Credit card number ${ccNumber} added to the online payment`)
  }
  completePayment(order: OnlineOrder): boolean {
    console.log(this.creditCardNumber, "Online")
    if (!this.creditCardNumber) throw new Error(`Cannot complete online payment at the moment.`)
    console.log(`Online payment completed for the online order ${order.id}`)
    return true
  }
}

// Physical order and payment
class PhysicalOrder implements Order {
  id: number;
  addProduct(productId: string): void {
    console.log(`Product ${productId} added to the physical order`)
  }
  addShippingAddress(address: string): void {
    console.log(`Shipping address ${address} added to the physical order`)
  }
  constructor(id: number) {
    this.id = id;
  }
}

class PhysicalPayment implements Payment {
  private creditCardNumber?: number
  addCreditCardNumber(ccNumber: number): void {
    this.creditCardNumber = ccNumber;
    console.log(`Credit card number ${ccNumber} added to the physical payment`)
  }
  completePayment(order: PhysicalOrder): boolean {
    console.log(this.creditCardNumber, "Physical")
    if (!this.creditCardNumber) throw new Error(`Cannot complete physical payment at the moment.`)
    console.log(`Physical payment completed for the physical order ${order.id}`)
    return true
  }
}

/** 3
 * Define the abstract factory which is an interface with a list of methods
 * that will create the object
*/
interface CommerceFactory {
  createOrder(id: number): Order;
  createPayment(): Payment;
}

/* 4
 * A new class that implements the Abstract Factory
*/
class OnlineCommerceFactory implements CommerceFactory {
  createOrder(id: number): Order {
    return new OnlineOrder(id)
  }
  createPayment(): Payment {
    return new OnlinePayment()
  }
}

class PhysicalCommerceFactory implements CommerceFactory {
  createOrder(id: number): Order {
    return new PhysicalOrder(id)
  }
  createPayment(): Payment {
    return new PhysicalPayment()
  }
}

/* 5
* The Factories are ready to be used for online order
*/ 
const onlineCommerceFactory = new OnlineCommerceFactory();
const onlineOrder = onlineCommerceFactory.createOrder(1);
const onlinePayment = onlineCommerceFactory.createPayment();

onlineOrder.addProduct('123')
onlineOrder.addShippingAddress('41, Jibowu Estate')
onlinePayment.addCreditCardNumber(1234564455)
onlinePayment.completePayment(onlineOrder)

/* 6
* For the Physical order
*/ 
const physicalCommerceFactory = new PhysicalCommerceFactory();
const physicalOrder = physicalCommerceFactory.createOrder(2)
const physicalPayment = physicalCommerceFactory.createPayment()

physicalOrder.addProduct('123')
physicalOrder.addShippingAddress('41, Jibowu Estate Road, U-turn Busstop, Abule-Egba, Lagos')
physicalPayment.addCreditCardNumber(123444)
physicalPayment.completePayment(physicalOrder)
