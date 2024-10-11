import mongoose from 'mongoose';

const databaseConnection = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/schemaDB', {
    autoIndex: true,
    maxPoolSize: 1000,
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log('Connected successfully to database'));
  return
}

export { databaseConnection }
