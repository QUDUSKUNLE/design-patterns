class CloudProviderService {
  public isLoggedIn(): boolean {
    console.log(`Logging in user...`)
    return true
  }

  public logIn(): void {
    // Logs the user in
  }

  public convertFile(file: string): string {
    console.log(`Converting file... ${file}`)
    return file;
    // Converts the file to a format that the cloud provider accepts
  }

  public uploadFile(file: string): void {
    console.log(`Uploading file... ${file}`);
    // Uploads the file to the cloud provider
  }

  public getFileLink(file: string): string {
    // Returns the link to the uploaded file
    console.log(`GetFileLink... ${file}`)
    return `http://example.com/${file}`;
  }
}

class CloudProviderFacade {
  private service: CloudProviderService;

  constructor() {
    this.service = new CloudProviderService();
  }

  public uploadFile(file: string): string {
    if (!this.service.isLoggedIn()) {
      this.service.logIn();
    }
    const convertedFile = this.service.convertFile(file);
    this.service.uploadFile(convertedFile);
    return this.service.getFileLink(convertedFile);
  }
}

const facade = new CloudProviderFacade();
const fileLink = facade.uploadFile("file.txt");
console.log("File link:", fileLink);
