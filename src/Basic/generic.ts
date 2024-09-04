function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val = initial;
  return [() => val, (v: T) => { val = v; }]
}
