import './ComplexityPanel.css'

function ComplexityPanel({ algorithm }) {
  const complexities = {
    bubble: {
      name: 'Bubble Sort',
      bestCase: 'O(n)',
      averageCase: 'O(n²)',
      worstCase: 'O(n²)',
      space: 'O(1)',
      description: 'Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    selection: {
      name: 'Selection Sort',
      bestCase: 'O(n²)',
      averageCase: 'O(n²)',
      worstCase: 'O(n²)',
      space: 'O(1)',
      description: 'Divides the array into sorted and unsorted regions, repeatedly selecting the minimum element from the unsorted region.'
    },
    insertion: {
      name: 'Insertion Sort',
      bestCase: 'O(n)',
      averageCase: 'O(n²)',
      worstCase: 'O(n²)',
      space: 'O(1)',
      description: 'Builds the sorted array one item at a time by comparing each element with previously sorted elements.'
    },
    merge: {
      name: 'Merge Sort',
      bestCase: 'O(n log n)',
      averageCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      space: 'O(n)',
      description: 'Divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges back together.'
    },
    quick: {
      name: 'Quick Sort',
      bestCase: 'O(n log n)',
      averageCase: 'O(n log n)',
      worstCase: 'O(n²)',
      space: 'O(log n)',
      description: 'Divide-and-conquer algorithm that selects a pivot and partitions the array around it.'
    }
  }

  const info = complexities[algorithm] || complexities.bubble

  return (
    <div className="complexity-panel">
      <h2>{info.name}</h2>
      <p className="description">{info.description}</p>
      <div className="complexity-grid">
        <div className="complexity-item">
          <span className="label">Best Case:</span>
          <span className="value">{info.bestCase}</span>
        </div>
        <div className="complexity-item">
          <span className="label">Average Case:</span>
          <span className="value">{info.averageCase}</span>
        </div>
        <div className="complexity-item">
          <span className="label">Worst Case:</span>
          <span className="value">{info.worstCase}</span>
        </div>
        <div className="complexity-item">
          <span className="label">Space:</span>
          <span className="value">{info.space}</span>
        </div>
      </div>
    </div>
  )
}

export default ComplexityPanel
