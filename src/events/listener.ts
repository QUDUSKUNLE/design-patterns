import { EventLogger, Message } from "./event";

const logger = new EventLogger();

logger.on('messageLogged', (message: Message) => {
  console.log(`Message logger: ${message.title}`)
  logger.MessageSent(message)
})

logger.on('messageSent', (message: Message) => {
  console.log(`Message sent: ${message.body}`)
  logger.MessageReceived()
  logger.MessageFailed(message)
})

logger.on('messageFailed', (message: Message) => {
  console.log(`Message failed: ${message.author}`)
})

logger.on('messageReceived', () => {
  console.log(`Message received.`)
})

logger.MessageLogger({title: "A new message", body: 'What a new message', author: 'John Doe'})
