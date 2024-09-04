function printIngredient(quantity: number, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${ extra ?? '' }`);
}

interface User {
  id: string;
  info?: {
    email?: string;
  }
}
function getEmail(user: User) {
  return user.info?.email ?? '';
}

function addCallback(index: number, key: string, callback?: (keys: string, yok: number) => void) {
  callback?.(key, index)
}


printIngredient(12, 'Yam', 'something more')
addCallback(12, 'Yes')
