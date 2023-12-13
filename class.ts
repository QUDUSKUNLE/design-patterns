
class Base {
  greet() {
    return 'Hello, Qudus Yekeen';
  }
}


class Greater extends Base {
  readonly name: string = 'Hello World';
  constructor(otherName?: string) {
    super();
    this.name = otherName ?? this.name
  }

  state = () => {
    return this.name
  }

  greet(otherName?: string) {
    const result = otherName ?? super.greet()
    return result
  }
}

const ade = new Greater();

console.log(ade.state())
