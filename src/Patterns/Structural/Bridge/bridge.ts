/* 1
* Bridge Pattern is a structural design pattern that allows uses to separate a * big class or set of related classes into two different domains.
* Abstraction (Interface) and Implementation (Platform)
* */ 

/* 2
* Abstraction Layer is the one that the client will use to interact with our
* application.
* */ 

abstract class UI {
  protected backend: Backend
  constructor(backend: Backend) {
    this.backend = backend;
  }
  abstract render(): void;
}

abstract class Backend {
  abstract getData(): string;
}

class AndroidUI extends UI {
  public render(): void {
    const data = this.backend.getData();
    console.log(`AndroidUI: Rendering data from the backend -> ${data}`);
  }
}

class IPhoneUI extends UI {
  public render(): void {
    const data = this.backend.getData();
    console.log(`IPhoneUI: Rendering data from the backend -> ${data}`);
  }
}

class MobileBackend implements Backend {
  public getData() {
    return 'MobileBackend: Data from the backend';
  }
}

// Test
const mobileBackend = new MobileBackend();
const androidUI = new AndroidUI(mobileBackend);
androidUI.render()

const iphoneUI = new IPhoneUI(mobileBackend);
iphoneUI.render()
