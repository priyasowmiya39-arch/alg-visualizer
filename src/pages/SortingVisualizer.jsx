import { useState, useEffect } from 'react'
import SortingBar from '../components/SortingBar'
import SortingControls from '../components/SortingControls'
import ComplexityPanel from '../components/ComplexityPanel'
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from '../algorithms/sorting'
import './SortingVisualizer.css'

function SortingVisualizer() {
  const [array, setArray] = useState([])
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [currentAlgorithm, setCurrentAlgorithm] = useState('bubble')
  const [speed, setSpeed] = useState(50)

  useEffect(() => {
    generateRandomArray()
  }, [])

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setComparisons(0)
    setSwaps(0)
  }

  const handleSort = async () => {
    setIsRunning(true)
    const speed_delay = 101 - parseInt(speed)
    
    switch (currentAlgorithm) {
      case 'bubble':
        await bubbleSort(array, setArray, setComparisons, setSwaps, speed_delay)
        break
      case 'selection':
        await selectionSort(array, setArray, setComparisons, setSwaps, speed_delay)
        break
      case 'insertion':
        await insertionSort(array, setArray, setComparisons, setSwaps, speed_delay)
        break
      case 'merge':
        await mergeSort(array, setArray, setComparisons, setSwaps, speed_delay)
        break
      case 'quick':
        await quickSort(array, setArray, setComparisons, setSwaps, speed_delay)
        break
      default:
        break
    }
    
    setIsRunning(false)
  }

  return (
    <div className="sorting-visualizer">
      <h1>Sorting Algorithm Visualizer</h1>
      
      <div className="visualizer-container">
        <div className="left-panel">
          <SortingControls
            onSort={handleSort}
            onRandom={generateRandomArray}
            onAlgorithmChange={setCurrentAlgorithm}
            onSpeedChange={setSpeed}
            isRunning={isRunning}
            currentAlgorithm={currentAlgorithm}
          />
          
          <ComplexityPanel algorithm={currentAlgorithm} />
        </div>

        <div className="right-panel">
          <SortingBar
            array={array}
            comparisons={comparisons}
            swaps={swaps}
          />
        </div>
      </div>
    </div>
  )
}

export default SortingVisualizer
