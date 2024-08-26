interface SendMessage {
  send(message: string): void
}

interface LogMessage {
  log(message: string): void
}

class SendNotifications implements SendMessage {
  send(message: string): void {
    throw new Error('Method not implemented.')
  }
}

class LogNotifications implements LogMessage {
  log(message: string): void {
    throw new Error('Method not implemented.')
  }
}
