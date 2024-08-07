import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { Color, RectObj } from '@renderer/utils'
import MousePos from './MousePos'
import ScrollArea from './ScrollArea'

const Canvas: React.FC = () => {
  const dispatch = useAppDispatch()
  const scale = useAppSelector((state) => state.canvas.scale)
  const drawingArea = useAppSelector((state) => state.canvas.drawingArea)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const initializedRef = useRef(false)

  const limitToBlackAndWhite = (imageData: ImageData): ImageData => {
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const grayscale = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      const color = grayscale > 127 ? 255 : 0
      data[i] = data[i + 1] = data[i + 2] = color // Set R, G, B to either 0 or 255
    }
    return imageData
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!

    if (initializedRef.current === false) {
      ctx.scale(2, 2)
      ctx.imageSmoothingEnabled = false
      initializedRef.current = true
    }
    ctx.clearRect(0, 0, drawingArea.width, drawingArea.height)
    for (let x = 0; x < drawingArea.width; x++) {
      for (let y = 0; y < drawingArea.height; y++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? 'white' : '#e7e7e7'
        ctx.fillRect(x, y, 1, 1)
      }
    }

    const test = new RectObj({ x: 10, y: 10 }, 50)
    test.setLineWidth(6)
    test.setColor(Color.White)
    test.setOutlineColor(Color.Black)
    test.draw(ctx)

    // ctx.fillStyle = 'black'
    ctx.font = 'bold 50px serif'
    ctx.strokeText('TEST', 50, 50)
    ctx.fillText('TEST', 50, 50)

    // const newImageData = limitToBlackAndWhite(ctx.getImageData(0, 0, canvas.width, canvas.height))
    // ctx.putImageData(newImageData, 0, 0)
  }, [drawingArea, scale])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <ScrollArea
      canvas={
        <canvas
          ref={canvasRef}
          width={drawingArea.width * 2}
          height={drawingArea.height * 2}
          style={{
            width: `${drawingArea.width * scale}px`,
            height: `${drawingArea.height * scale}px`,
            transformOrigin: '0 0',
            imageRendering: 'pixelated',
            border: '1px solid gray'
          }}
          onMouseMove={(event) => {
            const rect = canvasRef.current!.getBoundingClientRect()
            const x = (event.clientX - rect.left) / scale
            const y = (event.clientY - rect.top) / scale
            setMousePos({ x, y, isHovered: true })
          }}
          onMouseLeave={() => setMousePos({ ...mousePos, isHovered: false })}
        />
      }
      mousePos={<MousePos x={mousePos.x} y={mousePos.y} isHovering={mousePos.isHovered} />}
    />
  )
}

export default Canvas
