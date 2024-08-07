import Vector2d from '@renderer/utils/Vector2d'
import CanvasObj from './CanvasObj'

class RectObj extends CanvasObj {
  private width: number
  private height: number

  constructor(pos: Vector2d, width: number, height?: number) {
    super(pos, 0)
    this.width = width
    this.height = height || width
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.getLineWidth()
    ctx.fillStyle = this.getColor().toString()
    ctx.strokeStyle = this.getOutlineColor().toString()
    ctx.beginPath()
    ctx.moveTo(this.getPosition().x, this.getPosition().y)
    ctx.lineTo(this.getPosition().x + this.width, this.getPosition().y)
    ctx.lineTo(this.getPosition().x + this.width, this.getPosition().y + this.height)
    ctx.lineTo(this.getPosition().x, this.getPosition().y + this.height)
    ctx.closePath()
    ctx.fill()
    if (this.getLineWidth() > 0) {
      // ctx.stroke()
    }
  }
}

export default RectObj
