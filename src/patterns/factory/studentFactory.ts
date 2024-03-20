import { randomInt } from "crypto";

interface Student {
  fullName(): string;
  matricNumber(): string;
  department(): string;
  courses(): string[];
}

abstract class Flower {
  public abstract FactoryMethod(): Student;
}

class CreateStudent implements Student {
  constructor(private firstName: string, private lastName: string) {}
  fullName(): string {
    return `${this.firstName.toLowerCase()} ${this.lastName.toUpperCase()}`
  }
  matricNumber(): string {
    return `${randomInt(1234)}`
  }
  department(): string {
    return 'Physics Department'
  }
  courses(): string[] {
    return ['English', 'Mathematics', 'Yoruba']
  }
}

export class CreateFlower extends Flower {
  constructor(private firstName: string, private lastName: string) {
    super()
  }
  public FactoryMethod(): Student {
    return new CreateStudent(this.firstName, this.lastName)
  }
}

function create(flower: Flower) {
  flower.FactoryMethod();
}
