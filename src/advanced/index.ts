export type Point = {
  x: number,
  y: number
}

export type Message = {
  title: string;
  body: string;
  author: string;
}

export type xAxis = keyof Point;

export type Points = {
  +readonly [key in keyof Point]: Point[key]
}

export type Mapped<T> = {
  -readonly [P in keyof T]-?: T[P]
}

export interface MessageBuilder {
  message: Mapped<Message>
}
