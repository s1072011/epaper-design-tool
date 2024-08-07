import React, { useState } from 'react'
import { ResizableBox, ResizeCallbackData } from 'react-resizable'
import 'react-resizable/css/styles.css'
import Layers from './Layers'
import Properties from './Properties'

const Inspector: React.FC = () => {
  const [width, setWidth] = useState(300)

  const handleResize = (_e: React.SyntheticEvent, data: ResizeCallbackData): void =>
    setWidth(data.size.width)

  return (
    <ResizableBox
      width={width}
      height={Infinity}
      axis="x"
      minConstraints={[200, Infinity]}
      maxConstraints={[window.innerWidth, Infinity]}
      resizeHandles={['w']}
      onResize={handleResize}
      handle={<span className="absolute top-0 bottom-0 left-0 border-l-2 cursor-ew-resize z-10" />}
    >
      <div className="h-full bg-gray-100 select-none">
        <div className="h-full flex flex-col">
          <div className="h-1/3 border-b p-3 overflow-y-auto scrollbar-thin">
            <Properties />
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <Layers />
          </div>
        </div>
      </div>
    </ResizableBox>
  )
}

export default Inspector
