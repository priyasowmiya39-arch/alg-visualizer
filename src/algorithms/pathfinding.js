// Helper function to check if a position is valid
const isValidPos = (row, col, grid) => {
  return (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[0].length &&
    grid[row][col].type !== 'wall'
  )
}

// Breadth-First Search (BFS) - explores in layers
export const bfs = async (grid, startPos, endPos, onUpdate, delay) => {
  const visited = new Set()
  const parent = {}
  const queue = [startPos]
  
  visited.add(`${startPos.row},${startPos.col}`)

  while (queue.length > 0) {
    const current = queue.shift()
    const currentKey = `${current.row},${current.col}`

    // Update visualization
    if (!(current.row === startPos.row && current.col === startPos.col)) {
      onUpdate(current, 'visited')
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Check if we reached the end
    if (current.row === endPos.row && current.col === endPos.col) {
      // Reconstruct path
      const path = []
      let node = currentKey
      while (parent[node]) {
        const [r, c] = node.split(',').map(Number)
        path.unshift({ row: r, col: c })
        node = parent[node]
      }
      return path
    }

    // Explore neighbors (up, down, left, right)
    const neighbors = [
      { row: current.row - 1, col: current.col },
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col - 1 },
      { row: current.row, col: current.col + 1 }
    ]

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`
      
      if (!visited.has(neighborKey) && isValidPos(neighbor.row, neighbor.col, grid)) {
        visited.add(neighborKey)
        parent[neighborKey] = currentKey
        queue.push(neighbor)
      }
    }
  }

  return []
}

// Depth-First Search (DFS) - explores deeply before backtracking
export const dfs = async (grid, startPos, endPos, onUpdate, delay) => {
  const visited = new Set()
  const parent = {}
  const stack = [startPos]

  while (stack.length > 0) {
    const current = stack.pop()
    const currentKey = `${current.row},${current.col}`

    // Skip if already visited
    if (visited.has(currentKey)) {
      continue
    }

    visited.add(currentKey)

    // Update visualization
    if (!(current.row === startPos.row && current.col === startPos.col)) {
      onUpdate(current, 'visited')
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Check if we reached the end
    if (current.row === endPos.row && current.col === endPos.col) {
      // Reconstruct path
      const path = []
      let node = currentKey
      while (parent[node]) {
        const [r, c] = node.split(',').map(Number)
        path.unshift({ row: r, col: c })
        node = parent[node]
      }
      return path
    }

    // Add neighbors to stack (reverse order for proper DFS)
    const neighbors = [
      { row: current.row + 1, col: current.col },
      { row: current.row - 1, col: current.col },
      { row: current.row, col: current.col + 1 },
      { row: current.row, col: current.col - 1 }
    ]

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`
      
      if (!visited.has(neighborKey) && isValidPos(neighbor.row, neighbor.col, grid)) {
        if (!parent[neighborKey]) {
          parent[neighborKey] = currentKey
        }
        stack.push(neighbor)
      }
    }
  }

  return []
}

// Dijkstra's Algorithm - finds shortest path
export const dijkstra = async (grid, startPos, endPos, onUpdate, delay) => {
  const distances = {}
  const parent = {}
  const visited = new Set()
  const unvisitedQueue = []

  // Initialize distances
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const key = `${row},${col}`
      if (grid[row][col].type !== 'wall') {
        distances[key] = Infinity
        unvisitedQueue.push({ row, col })
      }
    }
  }

  const startKey = `${startPos.row},${startPos.col}`
  distances[startKey] = 0

  while (unvisitedQueue.length > 0) {
    // Find unvisited node with minimum distance
    let minIndex = 0
    let minDistance = Infinity

    for (let i = 0; i < unvisitedQueue.length; i++) {
      const node = unvisitedQueue[i]
      const key = `${node.row},${node.col}`
      if (distances[key] < minDistance) {
        minDistance = distances[key]
        minIndex = i
      }
    }

    const current = unvisitedQueue.splice(minIndex, 1)[0]
    const currentKey = `${current.row},${current.col}`
    
    if (visited.has(currentKey)) continue
    visited.add(currentKey)

    // Update visualization
    if (!(current.row === startPos.row && current.col === startPos.col)) {
      onUpdate(current, 'visited')
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Found destination
    if (current.row === endPos.row && current.col === endPos.col) {
      const path = []
      let node = currentKey
      while (parent[node]) {
        const [r, c] = node.split(',').map(Number)
        path.unshift({ row: r, col: c })
        node = parent[node]
      }
      return path
    }

    // Check neighbors
    const neighbors = [
      { row: current.row - 1, col: current.col },
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col - 1 },
      { row: current.row, col: current.col + 1 }
    ]

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`
      
      if (!visited.has(neighborKey) && isValidPos(neighbor.row, neighbor.col, grid)) {
        const newDistance = distances[currentKey] + 1
        
        if (newDistance < distances[neighborKey]) {
          distances[neighborKey] = newDistance
          parent[neighborKey] = currentKey
        }
      }
    }
  }

  return []
}

// A* Algorithm - heuristic-based shortest path
export const aStar = async (grid, startPos, endPos, onUpdate, delay) => {
  const heuristic = (pos) => {
    return Math.abs(pos.row - endPos.row) + Math.abs(pos.col - endPos.col)
  }

  const gScore = {}
  const fScore = {}
  const parent = {}
  const visited = new Set()
  const openSet = [startPos]

  const startKey = `${startPos.row},${startPos.col}`
  gScore[startKey] = 0
  fScore[startKey] = heuristic(startPos)

  while (openSet.length > 0) {
    // Find node with lowest fScore
    let current = null
    let lowestIndex = 0
    let lowestFScore = Infinity

    for (let i = 0; i < openSet.length; i++) {
      const node = openSet[i]
      const key = `${node.row},${node.col}`
      const score = fScore[key] || Infinity
      
      if (score < lowestFScore) {
        lowestFScore = score
        current = node
        lowestIndex = i
      }
    }

    if (!current) break

    const currentKey = `${current.row},${current.col}`

    // Check if reached end
    if (current.row === endPos.row && current.col === endPos.col) {
      const path = []
      let node = currentKey
      while (parent[node]) {
        const [r, c] = node.split(',').map(Number)
        path.unshift({ row: r, col: c })
        node = parent[node]
      }
      return path
    }

    openSet.splice(lowestIndex, 1)
    visited.add(currentKey)

    // Update visualization
    if (!(current.row === startPos.row && current.col === startPos.col)) {
      onUpdate(current, 'visited')
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Check neighbors
    const neighbors = [
      { row: current.row - 1, col: current.col },
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col - 1 },
      { row: current.row, col: current.col + 1 }
    ]

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`
      
      if (visited.has(neighborKey) || !isValidPos(neighbor.row, neighbor.col, grid)) {
        continue
      }

      const tentativeGScore = gScore[currentKey] + 1

      if (!gScore[neighborKey]) {
        gScore[neighborKey] = Infinity
      }

      if (tentativeGScore < gScore[neighborKey]) {
        parent[neighborKey] = currentKey
        gScore[neighborKey] = tentativeGScore
        fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor)

        // Add to open set if not already there
        const isInOpenSet = openSet.some(n => n.row === neighbor.row && n.col === neighbor.col)
        if (!isInOpenSet) {
          openSet.push(neighbor)
        }
      }
    }
  }

  return []
}