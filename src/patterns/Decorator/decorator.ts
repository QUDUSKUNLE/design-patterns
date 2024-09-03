/* 1
* The Decorator Pattern is a structural design patttern that allows you to
* dynamically add new behaviour to objects.
* Decorator pattern is useful when one want to add behaviour to individual
* objects, rather than to an entire class of objects.
*/ 

/* 2
* Applicability
* Add a new behaviour to an existing object, but don't want to modify its class
* Add a new behaviour to a set of objects, but don't want create a new subclass
* Add a new behaviour that can be changed dynamically at runtime.
**/ 

interface DataSource {
  writeData(data: string): void;
  readData(): string;
}

class FileDataSource implements DataSource {
  private fileName: string;
  private data?: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }
  writeData(data: string): void {
    console.log(`[FileDataSource] Writing to file: ${this.fileName}, data: ${data}`)
    this.data = data;
  }
  readData(): string {
    console.log(`[FileDataSource] Reading from file: ${this.fileName}, data: ${this.data}`)
    return this.data ?? this.fileName;
  }
}

class DataSourceDecorator implements DataSource {
  protected source: DataSource;
  constructor(source: DataSource) {
    this.source = source;
  }
  writeData(data: string): void {
    this.source.writeData(data)
  }
  readData(): string {
    return this.source.readData();
  }
}

class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    const base64Data = btoa(data);
    console.log(`[EncryptionDecorator] Encrypted data: ${base64Data}`)
    super.writeData(base64Data);
  }
  readData(): string {
    const base64Data = atob(super.readData());
    console.log(`[EncryptionDecorator] Decrypted data: ${base64Data}`);
    return base64Data.substring(0, base64Data.length)
  }
}

class ReverseDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    const compressedData = data.split('').reverse().join('');
    console.log(`[ReverseDecorator] Reversed data: ${compressedData}`)
    super.writeData(compressedData)
  }
  readData(): string {
    let data = super.readData()
    data = data.split('').reverse().join('');
    console.log(`[ReverseDecorator] Unreversed data: ${data}`)
    return data
  }
}

const file = new FileDataSource('file.pdf')
const encryptedFile = new EncryptionDecorator(file)

encryptedFile.writeData('Hello world, Abdul-Muhsin Abdul-Quddus Yekeen.')
encryptedFile.readData()
