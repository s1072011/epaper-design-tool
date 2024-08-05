abstract class DrawingTool {
  abstract onMouseDown(event: React.MouseEvent, ctx: CanvasRenderingContext2D): void
  abstract onMouseMove(event: React.MouseEvent, ctx: CanvasRenderingContext2D): void
  abstract onMouseUp(event: React.MouseEvent, ctx: CanvasRenderingContext2D): void
}

export default DrawingTool
