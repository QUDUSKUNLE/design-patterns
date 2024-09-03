/* 1
* Composite pattern is a structural pattern which allows you to create tree
* structures of objects and treat them as a single object.
*/ 

/* 2
* Applicability
* Your model can be represented as a tree structure
* You want to simplify the interraction of the client code with your model
*/


/* 3
* We defined our objects to create a common interface for them
*/ 
interface Component {
  render: () => void;
}

/* 4
* We create the classes of the different objects defined in the first step
*/
class SimpleText implements Component {
  private text: string;
  render() {
    console.log('Rendering text', this.text);
  };
  constructor(text: string) { this.text = text; }
}

class SimpleImage implements Component {
  private src: string;
  constructor(src: string) { this.src = src;}
  render() {
    console.log('Rendering image:', this.src)
  }
}

class Block implements Component {
  private children: Array<Component> = [];
  public add(component: Component): void {
    this.children.push(component);
  }
  public render() {
    this.children.forEach(child => child.render());
  }
}

// Testing
let block = new Block();
block.add(new SimpleText('Hello world!'));
block.add(new SimpleImage('https://example.com/image.png'))
block.render()

const nestedBlock = new Block();
nestedBlock.add(new SimpleText('Hello, check the following image:'))
nestedBlock.add(new SimpleImage('https://example.com/image.png'));

const mainBlock = new Block();
mainBlock.add(nestedBlock)
mainBlock.add(new SimpleText('Thanks for reading!'));
mainBlock.render();
