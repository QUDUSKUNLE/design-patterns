/**
 * Factory method is a creational design pattern which solves the problem of
 * creating product objects without specifying their concrete classes.
 *
 * This is recognized by creation methods that construct objects from concrete
 * classes.
 * While concrete classes are used during the object creation, the return type
 * of the factory methods is usually declared as either an abstract class or an
 * interface.
 */

// Declares all operations that all concrete product must implement.
interface Product {
  area(): number;
  perimeter(): number;
}

abstract class Creation {
  public abstract factoryMethod(): Product;

  public areaOperation(): number {
    const product = this.factoryMethod();
    return product.area();
  }

  public perimeterOperation(): number {
    const deleteProduct = this.factoryMethod();
    return deleteProduct.perimeter();
  }
}

class ConcreteProduct implements Product {
  constructor(
    private length: number,
    private width: number,
  ) {}
  area(): number {
    return this.length * this.width;
  }
  perimeter(): number {
    return 2 * (this.length + this.width);
  }
}

export class ConcreteCreator extends Creation {
  constructor(
    private length: number,
    private width: number,
  ) {
    super();
  }
  public factoryMethod(): Product {
    return new ConcreteProduct(this.length, this.width);
  }
}
