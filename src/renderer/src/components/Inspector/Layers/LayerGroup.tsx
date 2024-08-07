import { FC, useRef, useState } from 'react'
import { FaLayerGroup, FaChevronRight } from 'react-icons/fa6'

interface LayerGroupProps {
  name: string
  children?: React.ReactNode
}

const LayerGroup: FC<LayerGroupProps> = ({ name, children }) => {
  const [layerName, setLayerName] = useState(name)
  const containerRef = useRef<HTMLDivElement>(null)
  const liRef = useRef<HTMLLIElement>(null)
  Object.entries
  return (
    <li ref={liRef} className="bg-white rounded-sm py-2">
      <div className="flex h-5 items-center gap-1 px-2">
        <span>
          <FaLayerGroup size={16} />
        </span>
        <input
          type="text"
          className="px-1 w-full"
          value={layerName}
          onInput={(e) => setLayerName(e.currentTarget.value)}
        />
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
      </div>
      <div ref={containerRef} className="pl-4 pt-2 hidden">
        <ul className="border-l">{children}</ul>
      </div>
    </li>
  )
}

export default LayerGroup
