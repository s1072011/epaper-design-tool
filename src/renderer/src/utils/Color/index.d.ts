declare class Color {
  r: number
  g: number
  b: number

  constructor(r: number = 0, g: number = 0, b: number = 0)
  constructor(color: Color)
  constructor(hex: string)

  toString(): string

  static readonly Black: Color
  static readonly White: Color
}

export default Color
