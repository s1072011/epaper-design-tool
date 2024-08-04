import React from 'react'
import {
  FaPen,
  FaEraser,
  FaT,
  FaShapes,
  FaFolderPlus,
  FaFolderOpen,
  FaFloppyDisk
} from 'react-icons/fa6'
import ToolbarItem from './ToolbarItem'

const Toolbar: React.FC = () => {
  const ICON_SIZE = 24
  return (
    <div className="h-full w-12 flex flex-col justify-between items-center bg-gray-200 p-2">
      <div>
        <ToolbarItem icon={<FaPen size={ICON_SIZE} />} name="Pencil" />
        <ToolbarItem icon={<FaEraser size={ICON_SIZE} />} name="Eraser" />
        <ToolbarItem icon={<FaT size={ICON_SIZE} />} name="Text" />
        <ToolbarItem icon={<FaShapes size={ICON_SIZE} />} name="Shapes" />
      </div>

      <div>
        <ToolbarItem icon={<FaFolderPlus size={ICON_SIZE} />} name="New" />
        <ToolbarItem icon={<FaFolderOpen size={ICON_SIZE} />} name="Open" />
        <ToolbarItem icon={<FaFloppyDisk size={ICON_SIZE} />} name="Export" />
      </div>
    </div>
  )
}

export default Toolbar
