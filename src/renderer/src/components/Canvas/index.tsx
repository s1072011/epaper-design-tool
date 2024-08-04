import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { setScale } from '../../store/canvasSlice'

const Canvas: React.FC = () => {
  const dispatch = useAppDispatch()
  const scale = useAppSelector((state) => state.canvas.scale)
  const drawingArea = useAppSelector((state) => state.canvas.drawingArea)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, isHovered: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleWheel = useCallback(
    (event: WheelEvent): void => {
      event.preventDefault()
      if (event.metaKey) {
        const newScale = event.deltaY < 0 ? scale + 0.1 : scale - 0.1
        dispatch(setScale(newScale))
      } else if (event.altKey) {
        // Scroll horizontally
        containerRef.current!.scrollLeft += event.deltaY
      } else {
        containerRef.current!.scrollTop += event.deltaY
      }
    },
    [scale, dispatch]
  )

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return (): void => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [handleWheel])

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
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (context) {
        context.clearRect(0, 0, drawingArea.width, drawingArea.height)

        for (let x = 0; x < drawingArea.width; x++) {
          for (let y = 0; y < drawingArea.height; y++) {
            context.fillStyle = (x + y) % 2 === 0 ? 'white' : '#e7e7e7'
            context.fillRect(x, y, 1, 1)
          }
        }
      }
    }
  }, [drawingArea])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <div
      className="relative overflow-auto w-full h-full flex justify-center items-center bg-gray-100"
      ref={containerRef}
    >
      <div
        style={{
          width: `${drawingArea.width * scale}px`,
          height: `${drawingArea.height * scale}px`
        }}
      >
        <canvas
          ref={canvasRef}
          width={drawingArea.width}
          height={drawingArea.height}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            imageRendering: 'pixelated', // 保持像素化效果
            border: `${1 / scale}px solid gray`
          }}
          onMouseMove={(event) => {
            const rect = canvasRef.current!.getBoundingClientRect()
            const x = (event.clientX - rect.left) / scale
            const y = (event.clientY - rect.top) / scale
            setMousePosition({ x, y, isHovered: true })
          }}
          onMouseLeave={() => setMousePosition({ ...mousePosition, isHovered: false })}
        />
      </div>
      {mousePosition.isHovered && (
        <div className="absolute right-0 bottom-0 text-xs flex gap-2">
          <div>{`x: ${mousePosition.x.toFixed(2)}`}</div>
          <div>{`y: ${mousePosition.y.toFixed(2)}`}</div>
        </div>
      )}
    </div>
  )
}

export default Canvas
