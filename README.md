# Algorithm Visualizer

An interactive web application for visualizing sorting and pathfinding algorithms in real-time.

## Features

### Sorting Algorithms
- **Bubble Sort**: A simple comparison-based sorting algorithm
- **Selection Sort**: Repeatedly selects the minimum element
- **Insertion Sort**: Builds the sorted array incrementally
- **Merge Sort**: Divide-and-conquer algorithm with O(n log n) complexity
- **Quick Sort**: Efficient divide-and-conquer algorithm with dynamic speed control

### Pathfinding Algorithms
- **Breadth-First Search (BFS)**: Explores all nodes at the current level
- **Depth-First Search (DFS)**: Explores as far as possible along each branch
- **Dijkstra's Algorithm**: Finds the shortest path with weighted edges
- **A* Search**: Heuristic-based pathfinding algorithm

### Interactive Features
- Adjustable animation speed
- Real-time comparison and swap counters
- Algorithm complexity information (Big O notation)
- Interactive grid for pathfinding (add walls, set start/end points)
- Responsive design for all screen sizes

## Technology Stack

- **React 18**: Frontend library
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **CSS3**: Styling with CSS variables for theming

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd algorithm-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Sorting Visualizer
1. Navigate to the "Sorting" page
2. Select an algorithm from the dropdown
3. Adjust the speed using the slider (1-100)
4. Click "Generate Random Array" to create a new array
5. Click "Start Sort" to begin the visualization

### Pathfinding Visualizer
1. Navigate to the "Pathfinding" page
2. Click on cells to toggle walls
3. Drag start/end points to reposition them (feature to be implemented)
4. Select a pathfinding algorithm
5. Click "Start Pathfinding" to visualize the algorithm

## Algorithm Complexity

### Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|-----------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

### Pathfinding Algorithms

| Algorithm | Time Complexity | Space Complexity | Optimal | Complete |
|-----------|-----------------|------------------|---------|----------|
| BFS | O(V + E) | O(V) | Yes | Yes |
| DFS | O(V + E) | O(V) | No | Yes |
| Dijkstra | O(V²) | O(V) | Yes | Yes |
| A* | O(b^d) | O(b^d) | Yes | Yes |

## Project Structure

```
algorithm-visualizer/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── algorithms/       # Algorithm implementations
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Future Enhancements

- [ ] Additional sorting algorithms (Heap Sort, Counting Sort, Radix Sort)
- [ ] 3D visualization for algorithms
- [ ] Sound effects for algorithm operations
- [ ] Algorithm complexity analyzer
- [ ] Save and share visualizations
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
- [ ] Step-by-step execution mode
- [ ] Custom array input

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is open source and available under the MIT License.

## Author

Algorithm Visualizer Team

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

Happy Learning! 🚀
