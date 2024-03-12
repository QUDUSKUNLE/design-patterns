interface Notify {
  send(): void
  log(): void
}

class NotifyService implements Notify {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
  send(): void {
    throw new Error( "Method not implemented." )
  }
  log(): void {
    throw new Error( "Method not implemented." )
  }
}
