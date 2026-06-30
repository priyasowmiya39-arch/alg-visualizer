import { useState, useEffect } from 'react'
import PathfindingGrid from '../components/PathfindingGrid'
import { bfs, dfs, dijkstra, aStar } from '../algorithms/pathfinding'
import './PathfindingVisualizer.css'

function PathfindingVisualizer() {
  const ROWS = 20
  const COLS = 30
  
  const [grid, setGrid] = useState([])
  const [startPos, setStartPos] = useState({ row: 5, col: 5 })
  const [endPos, setEndPos] = useState({ row: 15, col: 25 })
  const [isRunning, setIsRunning] = useState(false)
  const [algorithm, setAlgorithm] = useState('bfs')

  useEffect(() => {
    initializeGrid()
  }, [])

  const initializeGrid = () => {
    const newGrid = Array(ROWS).fill(null).map(() =>
      Array(COLS).fill(null).map(() => ({
        type: 'empty',
        distance: Infinity,
        parent: null
      }))
    )
    
    newGrid[startPos.row][startPos.col].type = 'start'
    newGrid[endPos.row][endPos.col].type = 'end'
    
    setGrid(newGrid)
  }

  const handleCellClick = (row, col) => {
    if (isRunning) return
    
    const newGrid = grid.map(r => r.map(cell => ({ ...cell })))
    const cell = newGrid[row][col]
    
    if (cell.type === 'start') {
      newGrid[startPos.row][startPos.col].type = 'empty'
      setStartPos({ row, col })
      newGrid[row][col].type = 'start'
    } else if (cell.type === 'end') {
      newGrid[endPos.row][endPos.col].type = 'empty'
      setEndPos({ row, col })
      newGrid[row][col].type = 'end'
    } else if (cell.type === 'wall') {
      cell.type = 'empty'
    } else if (cell.type !== 'start' && cell.type !== 'end') {
      cell.type = 'wall'
    }
    
    setGrid(newGrid)
  }

  const handleStartVisualization = async () => {
    setIsRunning(true)
    
    // Create a fresh copy of the grid for the algorithm
    const algorithmGrid = grid.map(r => r.map(cell => ({ ...cell })))
    const delay = 30

    const onUpdate = (pos, type) => {
      setGrid(prevGrid => {
        const updatedGrid = prevGrid.map(r => r.map(cell => ({ ...cell })))
        if (updatedGrid[pos.row][pos.col].type !== 'start' && 
            updatedGrid[pos.row][pos.col].type !== 'end') {
          updatedGrid[pos.row][pos.col].type = type
        }
        return updatedGrid
      })
    }

    try {
      let path = []

      switch (algorithm) {
        case 'bfs':
          path = await bfs(algorithmGrid, startPos, endPos, onUpdate, delay)
          break
        case 'dfs':
          path = await dfs(algorithmGrid, startPos, endPos, onUpdate, delay)
          break
        case 'dijkstra':
          path = await dijkstra(algorithmGrid, startPos, endPos, onUpdate, delay)
          break
        case 'astar':
          path = await aStar(algorithmGrid, startPos, endPos, onUpdate, delay)
          break
        default:
          break
      }

      // Draw the path
      setGrid(prevGrid => {
        const finalGrid = prevGrid.map(r => r.map(cell => ({ ...cell })))
        for (const pos of path) {
          if (finalGrid[pos.row][pos.col].type !== 'start' && 
              finalGrid[pos.row][pos.col].type !== 'end') {
            finalGrid[pos.row][pos.col].type = 'path'
          }
        }
        return finalGrid
      })
    } catch (error) {
      console.error('Pathfinding error:', error)
    }

    setIsRunning(false)
  }

  return (
    <div className="pathfinding-visualizer">
      <h1>Pathfinding Algorithm Visualizer</h1>
      
      <div className="controls">
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isRunning}>
          <option value="bfs">Breadth-First Search</option>
          <option value="dfs">Depth-First Search</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A* Search</option>
        </select>
        
        <button onClick={handleStartVisualization} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Start Pathfinding'}
        </button>
        
        <button onClick={initializeGrid} disabled={isRunning}>
          Clear Grid
        </button>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color start"></div>
          <span>Start</span>
        </div>
        <div className="legend-item">
          <div className="legend-color end"></div>
          <span>End</span>
        </div>
        <div className="legend-item">
          <div className="legend-color wall"></div>
          <span>Wall</span>
        </div>
        <div className="legend-item">
          <div className="legend-color visited"></div>
          <span>Visited</span>
        </div>
        <div className="legend-item">
          <div className="legend-color path"></div>
          <span>Path</span>
        </div>
      </div>

      {grid.length > 0 && (
        <PathfindingGrid 
          grid={grid} 
          rows={ROWS} 
          cols={COLS}
          onCellClick={handleCellClick}
        />
      )}
    </div>
  )
}

export default PathfindingVisualizer