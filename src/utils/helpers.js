// Array helper functions
export const shuffle = (arr) => {
  const newArr = [...arr]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

export const isSorted = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true
}

export const generateRandomArray = (length, maxValue = 100) => {
  return Array.from({ length }, () => Math.floor(Math.random() * maxValue) + 1)
}

// Grid helper functions
export const initializeGrid = (rows, cols) => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => ({
      type: 'empty',
      distance: Infinity,
      parent: null
    }))
  )
}

export const isValidCell = (pos, grid) => {
  return (
    pos.row >= 0 &&
    pos.row < grid.length &&
    pos.col >= 0 &&
    pos.col < grid[0].length &&
    grid[pos.row][pos.col].type !== 'wall'
  )
}

export const getNeighbors = (pos) => {
  return [
    { row: pos.row - 1, col: pos.col }, // Up
    { row: pos.row + 1, col: pos.col }, // Down
    { row: pos.row, col: pos.col - 1 }, // Left
    { row: pos.row, col: pos.col + 1 }  // Right
  ]
}

export const manhattanDistance = (pos1, pos2) => {
  return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col)
}

export const euclideanDistance = (pos1, pos2) => {
  const dx = pos1.row - pos2.row
  const dy = pos1.col - pos2.col
  return Math.sqrt(dx * dx + dy * dy)
}

// String conversion helpers
export const timeFormatted = (ms) => {
  const seconds = Math.floor(ms / 1000)
  const milliseconds = ms % 1000
  return `${seconds}.${String(milliseconds).padStart(3, '0')}s`
}

export const formatNumber = (num) => {
  return num.toLocaleString()
}
