import React, { useState } from 'react'
import { ResizableBox, ResizeCallbackData } from 'react-resizable'
import 'react-resizable/css/styles.css'
import Layers from './Layers'
import Properties from './Properties'

const Inspector: React.FC = () => {
  const [width, setWidth] = useState(300)

  const handleResize = (_e: React.SyntheticEvent, data: ResizeCallbackData): void => {
    // 更新宽度
    setWidth(data.size.width)
  }

  return (
    <ResizableBox
      width={width}
      height={Infinity}
      axis="x"
      minConstraints={[300, Infinity]}
      maxConstraints={[window.innerWidth, Infinity]}
      resizeHandles={['w']}
      onResize={handleResize}
      handle={
        <span className="absolute top-0 left-0 bottom-0 border border-double border-gray-300 border-l-2 cursor-ew-resize z-10" />
      }
    >
      <div className="h-full border-l bg-gray-200">
        <div className="flex flex-col h-full">
          <div className="border-b p-3 overflow-auto h-1/3">
            <Properties />
          </div>
          <div className="flex-1 p-3 overflow-auto">
            <Layers />
          </div>
        </div>
      </div>
    </ResizableBox>
  )
}

export default Inspector
