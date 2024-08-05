import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setScale } from '../../store/canvasSlice'

interface ScrollAreaProps {
  canvas: React.ReactElement<HTMLCanvasElement>
  mousePos: React.ReactNode
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ canvas, mousePos }) => {
  const dispatch = useAppDispatch()
  const scale = useAppSelector((state) => state.canvas.scale)
  const [scroll, setScroll] = useState({ x: 0, y: 0 })
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const calDirection = (num: number): number => {
    return num < 0 ? 1 : -1
  }

  const handleZoom = (event: WheelEvent): void => {
    const step = 0.5 * calDirection(event.deltaY)
    const newScale = scale + step
    if (newScale > 0.1 && newScale < 20) {
      dispatch(setScale(newScale))
    }
  }

  const handleScroll = (event: WheelEvent): void => {
    const containerRect = containerRef.current!.getBoundingClientRect()
    const step =
      (Math.sqrt(
        containerRect.width * containerRect.width + containerRect.height * containerRect.height
      ) /
        20) *
      calDirection(event.deltaY)

    if (event.altKey) {
      setScroll((prevScroll) => ({ ...prevScroll, x: prevScroll.x + step }))
    } else {
      setScroll((prevScroll) => ({ ...prevScroll, y: prevScroll.y + step }))
    }
  }

  const handleWheel = useCallback(
    (event: WheelEvent): void => {
      event.preventDefault()
      if (event.metaKey) {
        handleZoom(event)
      } else {
        handleScroll(event)
      }
    },
    [scale, dispatch]
  )

  useEffect(() => {
    const scrollArea = scrollAreaRef.current!

    scrollArea.addEventListener('wheel', handleWheel, { passive: false })

    // Cleanup
    return (): void => {
      scrollArea.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <div
      className="relative w-full h-full flex justify-center items-center bg-gray-50"
      ref={scrollAreaRef}
      onDoubleClick={(event) => {
        if (event.metaKey) {
          dispatch(setScale(1))
          setScroll({ x: 0, y: 0 })
        }
      }}
    >
      <div
        ref={containerRef}
        className="fixed p-5"
        style={{ translate: `${scroll.x}px ${scroll.y}px` }}
      >
        {canvas}
      </div>
      {mousePos}
    </div>
  )
}

export default ScrollArea
