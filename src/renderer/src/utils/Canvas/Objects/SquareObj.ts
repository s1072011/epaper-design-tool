import Vector2d from '@renderer/utils/Vector2d'
import CanvasObj from './CanvasObj'

class SquareObj extends CanvasObj {
  private size: number

  constructor(pos: Vector2d, size: number = 1) {
    super(pos, 0)
    this.size = size
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.getLineWidth()
    ctx.fillStyle = this.getColor().toString()
    ctx.strokeStyle = this.getOutlineColor().toString()
    ctx.beginPath()
    ctx.moveTo(this.getPosition().x, this.getPosition().y)
    ctx.lineTo(this.getPosition().x + this.size, this.getPosition().y)
    ctx.lineTo(this.getPosition().x + this.size, this.getPosition().y + this.size)
    ctx.lineTo(this.getPosition().x, this.getPosition().y + this.size)
    ctx.closePath()
    ctx.fill()
    if (this.getLineWidth() > 0) {
      // ctx.stroke()
    }
  }
}

export default SquareObj
