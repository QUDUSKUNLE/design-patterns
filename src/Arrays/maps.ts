
export interface Message {
  title: string;
  body?: string;
  author?: string;
}
//A map use a key value in JavaScript
const map = new Map<string, Message>();

// Map functions
// clear
// delete
// entries
// get
// groupBy
// has
// keys
// set
// size
// values

map.set('a', { title: 'a', author: 'Muhsinah' });
map.set('b', { title: 'b', body: 'abc', author: 'Abdul-Muhsin'})
map.set('c', { title: 'c', body: 'abc', author: 'Maryam'})

// console.log(map.size, map.keys(), map.get('a'))

const callback = (message: Message): boolean => {
  return message.author ? true : false
}

// Run through the data in the map
for (const [key, message] of map.entries()) {
  console.log(message.body ?? key)
}

// Alternatively
map.forEach((value, key) => {
  if (key === 'a') console.log(value)
})

