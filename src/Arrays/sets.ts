// Set is a collection of unique values
import { Message } from './maps';

const set = new Set<Message>();

// Set functions
// add
// clear
// delete
// entries
// forEach
// has
// keys
// size
// values

set.add({ title: 'a', author: 'Muhsinah' })

set.add({ title: 'b', body: 'abc', author: 'Abdul-Muhsin'})

for (const x of set) {
  console.log(x.title, x.author ?? 'author', x.body ?? 'body')
}

for (const value of set.entries()) {
  console.log(value, 'entries')
}
