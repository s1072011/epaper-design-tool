import React, { useState } from 'react'
import ArrowPopup from '../../ArrowPopup' // 假设ArrowPopup位于同一目录下

interface ToolbarItemProps {
  icon: React.ReactNode
  name: string
  position?: 'top' | 'right' | 'bottom' | 'left'
  onClick?: () => void
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ icon, name, position = 'right', onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex items-center p-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {icon}
      <ArrowPopup content={name} position={position} offset={3} visible={isHovered} />
    </div>
  )
}

export default ToolbarItem
