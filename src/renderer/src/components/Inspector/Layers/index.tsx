import React from 'react'
import LayerItem from './LayerItem'

const Layers: React.FC = () => {
  return (
    <div>
      <ul className="space-y-0.5">
        <LayerItem name="Layer 2">
          {[{ name: 'Layer 1.1', children: [{ name: 'Layer 1.1.1' }] }]}
        </LayerItem>
      </ul>
    </div>
  )
}

export default Layers
