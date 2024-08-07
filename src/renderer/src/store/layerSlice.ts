import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import LayerTree, { LayerNode } from '@renderer/components/Inspector/Layers/LayerTree'

export interface LayerState {
  layers: LayerTree
}
const initialState: LayerState = {
  layers: new LayerTree()
}

const canvasSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addLayer: (state, action: PayloadAction<LayerNode>) => {
      // state.layers.push(action.payload)
    }
  }
})

export const { addLayer } = canvasSlice.actions

export default canvasSlice.reducer
