interface NotificationSender {
  send(message: string): void
  log(notification: string): void
}

class NotificationService {
  private sender: NotificationSender

  constructor(sender: NotificationSender) {
    this.sender = sender
  }

  sendNotification(message: string) {
    this.sender.send(message);
  }

  logNotification(notification: string) {
    this.sender.log(notification);
  }
}
