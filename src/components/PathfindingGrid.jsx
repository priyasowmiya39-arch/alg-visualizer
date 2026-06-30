import './PathfindingGrid.css'

function PathfindingGrid({ grid, rows, cols, onCellClick }) {
  return (
    <div className="pathfinding-grid-container">
      <div 
        className="pathfinding-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`grid-cell ${cell.type}`}
              onClick={() => onCellClick(rowIdx, colIdx)}
              title={`Row: ${rowIdx}, Col: ${colIdx}`}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default PathfindingGrid
