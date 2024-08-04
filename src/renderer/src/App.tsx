import Canvas from './components/Canvas'
import Inspector from './components/Inspector'
import Toolbar from './components/Toolbar'

const App: React.FC = () => {
  return (
    <div className="flex h-full">
      <Toolbar />
      <Canvas />
      <Inspector />
    </div>
  )
}

export default App
