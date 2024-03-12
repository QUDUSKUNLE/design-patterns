
interface NotificationSender {
  send(message: string): void
}

class NotificationService {
  private sender: NotificationSender;

  constructor(sender: NotificationSender) {
    this.sender = sender
  }

  sendNotification(message: string) {
    this.sender.send(message)
  }
}

export enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4
}
