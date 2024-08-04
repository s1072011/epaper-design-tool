import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CanvasState {
  scale: number
  drawingArea: { width: number; height: number }
}

const initialState: CanvasState = {
  scale: 1,
  drawingArea: { width: 212, height: 104 }
}

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setScale(state, action: PayloadAction<number>) {
      state.scale = action.payload
    },
    setDrawingAreaSize(state, action: PayloadAction<{ width: number; height: number }>) {
      state.drawingArea = action.payload
    }
  }
})

export const { setScale, setDrawingAreaSize } = canvasSlice.actions

export default canvasSlice.reducer
