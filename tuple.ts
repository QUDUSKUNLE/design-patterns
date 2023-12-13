type ThreeCoordinate = [x: number, y: number, z: number];

function add3DCoordinate(c1: ThreeCoordinate, c2: ThreeCoordinate): ThreeCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]]
}

function simpleStringState(initial: string): [() => string, (str: string) => void] {
  let str = initial;
  return [() => str, (v: string) => { str = v }]
}

const [stringGetter, stringSetter] = simpleStringState('Qudus Yekeen')
console.log(stringGetter())
stringSetter('Kunle')
console.log(stringGetter())
