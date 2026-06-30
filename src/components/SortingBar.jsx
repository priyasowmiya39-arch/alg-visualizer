import './SortingBar.css'

function SortingBar({ array, comparisons, swaps }) {
  return (
    <div className="sorting-bar-container">
      <div className="bars">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{
              height: `${value}%`,
              width: `${100 / array.length}%`
            }}
          />
        ))}
      </div>
      <div className="stats">
        <p>Comparisons: {comparisons}</p>
        <p>Swaps: {swaps}</p>
      </div>
    </div>
  )
}

export default SortingBar
