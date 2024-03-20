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
