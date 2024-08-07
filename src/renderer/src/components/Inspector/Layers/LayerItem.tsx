import { FC, useRef, useState } from 'react'
import {
  FaEllipsisVertical,
  FaLock,
  FaLockOpen,
  FaEye,
  FaEyeSlash,
  FaChevronRight,
  FaLayerGroup
} from 'react-icons/fa6'
import { LayerNode } from './LayerTree'

// interface LayerItemProps {
//   name: string
//   children?: React.ReactNode
// }

const LayerItem: FC<LayerNode> = ({ name, children = null }) => {
  const ICON_SIZE = 16
  const [layerName, setLayerName] = useState(name)
  const [isLocked, setIsLocked] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const liRef = useRef<HTMLLIElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isGroup = children instanceof Array

  return (
    <li ref={liRef} className="bg-white rounded-sm py-2">
      <div className="h-5 flex items-center gap-1 px-2">
        {isGroup && (
          <span>
            <FaLayerGroup size={ICON_SIZE} />
          </span>
        )}
        <span onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <FaEye size={ICON_SIZE} /> : <FaEyeSlash size={ICON_SIZE} />}
        </span>
        <span onClick={() => setIsLocked(!isLocked)}>
          {isLocked ? <FaLock size={ICON_SIZE} /> : <FaLockOpen size={ICON_SIZE} />}
        </span>
        <input
          type="text"
          className="px-1 w-full"
          value={layerName}
          onInput={(e) => setLayerName(e.currentTarget.value)}
          disabled={isLocked}
        />

        {isGroup ? (
          <span
            onClick={(e) => {
              const target = e.currentTarget as HTMLSpanElement
              if (target.children[0] instanceof SVGSVGElement) {
                target.children[0].classList.toggle('rotate-90')
                containerRef.current?.classList.toggle('hidden')
                liRef.current?.classList.toggle('pb-0')
              }
            }}
          >
            <FaChevronRight size={16} />
          </span>
        ) : (
          <span>
            <FaEllipsisVertical size={ICON_SIZE} />
          </span>
        )}
      </div>
      {isGroup && (
        <div ref={containerRef} className="pl-4 pt-2 hidden">
          <ul className="border-l pl-1">
            {children.map((item) => (
              <LayerItem key={item.name} {...item} />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export default LayerItem
