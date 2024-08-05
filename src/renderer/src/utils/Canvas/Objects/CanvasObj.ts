import Color from '../../Color'
import Vector2d from '../../Vector2d'
import Drawable from './Drawable'

abstract class CanvasObj implements Drawable {
  private position: Vector2d
  private lineWidth: number
  private color: Color = Color.Black
  private outlineColor: Color = Color.Black

  constructor(pos: Vector2d, lineWidth: number = 1) {
    this.position = pos
    this.lineWidth = lineWidth
  }

  setPosition(pos: Vector2d): void {
    this.position = pos
  }

  getPosition(): Vector2d {
    return this.position
  }

  setColor(color: Color): void {
    this.color = color
  }

  getColor(): Color {
    return this.color
  }

  setOutlineColor(color: Color): void {
    this.outlineColor = color
  }

  getOutlineColor(): Color {
    return this.outlineColor
  }

  setLineWidth(width: number): void {
    this.lineWidth = width
  }

  getLineWidth(): number {
    return this.lineWidth
  }

  abstract draw(ctx: CanvasRenderingContext2D): void
}

export default CanvasObj
