

const person: Record<string, unknown> = {};

person.firstName = 'John';
person.lastName = 'Doe';
person.age = 50;
person.eyeColor = 'blue';

console.log(person);

const newPerson = {
  firstName: 'John',
  lastName: 'Doe',
  id: 556,
  fullName: function () {
    return this.firstName + ' ' + this.lastName
  }
}

