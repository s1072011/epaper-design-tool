class Vector2d {
  x: number
  y: number

  constructor(x: number, y: number)

  constructor(v: Vector2d)

  constructor(x: number | Vector2d, y?: number) {
    if (x instanceof Vector2d) {
      this.x = x.x
      this.y = x.y
    } else {
      this.x = x
      this.y = y!
    }
  }
}

export default Vector2d
