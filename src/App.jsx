import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SortingVisualizer from './pages/SortingVisualizer'
import PathfindingVisualizer from './pages/PathfindingVisualizer'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/pathfinding" element={<PathfindingVisualizer />} />
      </Routes>
    </Router>
  )
}

export default App
