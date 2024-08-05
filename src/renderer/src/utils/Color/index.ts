class Color {
  r: number
  g: number
  b: number
  constructor(r: number, g: number, b: number)
  constructor(color: Color)
  constructor(hex: string)

  constructor(r: number | Color | string, g?: number, b?: number) {
    if (r instanceof Color) {
      this.r = r.r
      this.g = r.g
      this.b = r.b
    } else if (typeof r === 'string') {
      const hex = r
      this.r = parseInt(hex.slice(1, 3), 16)
      this.g = parseInt(hex.slice(3, 5), 16)
      this.b = parseInt(hex.slice(5, 7), 16)
    } else {
      this.r = r
      this.g = g!
      this.b = b!
    }
  }

  toString(): string {
    return `rgb(${this.r},${this.g},${this.b})`
  }

  static readonly Black = new Color(0, 0, 0)
  static readonly White = new Color(255, 255, 255)
}

export default Color
