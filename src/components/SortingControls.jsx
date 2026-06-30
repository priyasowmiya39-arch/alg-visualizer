import './SortingControls.css'

function SortingControls({ 
  onSort, 
  onRandom, 
  onAlgorithmChange, 
  onSpeedChange,
  isRunning,
  currentAlgorithm
}) {
  return (
    <div className="sorting-controls">
      <div className="control-group">
        <label htmlFor="algorithm">Algorithm:</label>
        <select 
          id="algorithm" 
          onChange={(e) => onAlgorithmChange(e.target.value)}
          value={currentAlgorithm}
          disabled={isRunning}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="speed">Speed:</label>
        <input 
          id="speed" 
          type="range" 
          min="1" 
          max="100" 
          defaultValue="50"
          onChange={(e) => onSpeedChange(e.target.value)}
          disabled={isRunning}
        />
      </div>

      <div className="control-group">
        <button onClick={onRandom} disabled={isRunning}>
          Generate Random Array
        </button>
        <button onClick={onSort} disabled={isRunning}>
          {isRunning ? 'Sorting...' : 'Start Sort'}
        </button>
      </div>
    </div>
  )
}

export default SortingControls
