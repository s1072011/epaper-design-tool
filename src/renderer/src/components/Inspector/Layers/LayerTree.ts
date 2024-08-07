import { CanvasObj } from '@renderer/utils'

export interface LayerNode {
  id: number
  name: string
  canvasObj?: CanvasObj
  children: LayerNode[] | null
}

class LayerTree {
  public root: LayerNode[] | null = []
}

export default LayerTree
