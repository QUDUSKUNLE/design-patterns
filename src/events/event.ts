import { EventEmitter } from 'events';

export interface Message {
  title: string;
  body: string;
  author: string;
}

export class EventLogger extends EventEmitter {
  MessageLogger(message: Message) {
    this.emit('messageLogged', message)
  }

  MessageSent(message: Message) {
    this.emit('messageSent', message)
  }

  MessageFailed(message: Message) {
    this.emit('messageFailed', message)
  }

  MessageReceived() {
    this.emit('messageReceived')
  }
}
