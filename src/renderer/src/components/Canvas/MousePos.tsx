import React from 'react'

interface MousePosProps {
  x: number
  y: number
  isHovering: boolean
}

const MousePos: React.FC<MousePosProps> = ({ x, y, isHovering }) => {
  if (isHovering) {
    return (
      <div className="absolute bottom-0 text-xs z-10 flex gap-2 select-none">
        <span>x: {x.toFixed(2)}</span>
        <span>y: {y.toFixed(2)}</span>
      </div>
    )
  }

  return null
}

export default MousePos
