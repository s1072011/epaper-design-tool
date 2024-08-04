import { configureStore } from '@reduxjs/toolkit'
import canvasSlice from './canvasSlice'

const store = configureStore({
  reducer: {
    canvas: canvasSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
