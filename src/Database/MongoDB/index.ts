import mongoose from 'mongoose';
import { Item } from './schema'

mongoose.connect('mongodb://127.0.0.1:27017/schemaDB', {
  autoIndex: true,
  maxPoolSize: 1000,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected successfully to database'));

(async () => {
  try {
    // const insert = await Item.insertMany([
    //   { name: 'Abdul-Muhsin', description: 'A baby boy', price: 24000},
    //   { name: 'Abdul-Quddus', description: 'Father', price: 50000},
    //   { name: 'Kawthar', description: 'Mother', price: 100000},
    //   { name: 'Maryam', description: 'Daughter', price: 2500000},
    //   { name: 'Muhsinah', description: 'Daughter', price: 400000}
    // ])
    const result = await Item.find({});
    console.log(result);
  } catch (error) {
    console.log(error)
  }
})()
