import { randomInt } from "crypto";


interface Student {
  fullName(): string;
  matricNumber(): string;
  department(): string;
  courses(): string[];
}

abstract class Flower {
  public abstract factoryMethod(): Student;
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

class CreateFlower extends Flower {
  constructor(private firstName: string, private lastName: string) {
    super()
  }
  public factoryMethod(): Student {
    return new CreateStudent(this.firstName, this.lastName)
  }
}

function create(flower: Flower) {
  console.log('Hooray, a new student just joined us.')
  const newFlower = flower.factoryMethod();
  console.log(newFlower.fullName());
  console.log(newFlower.department());
  console.log(newFlower.matricNumber());
  console.log(newFlower.courses());
}

console.log('Launched: Flower App');
create(new CreateFlower('Abdul-Quddus', 'Yekeen'))
