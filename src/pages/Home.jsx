import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Algorithm Visualizer</h1>
        <p>Learn algorithms through interactive visualization</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <h2>Sorting Algorithms</h2>
          <p>Visualize how different sorting algorithms work, compare their performance and understand time complexity.</p>
          <Link to="/sorting" className="btn">
            Explore Sorting
          </Link>
        </div>

        <div className="feature-card">
          <h2>Pathfinding Algorithms</h2>
          <p>Watch pathfinding algorithms navigate through grids, understand how they search for the shortest path.</p>
          <Link to="/pathfinding" className="btn">
            Explore Pathfinding
          </Link>
        </div>
      </div>

      <div className="info">
        <h2>How it Works</h2>
        <div className="info-content">
          <div className="info-item">
            <h3>1. Select Algorithm</h3>
            <p>Choose from a variety of sorting and pathfinding algorithms.</p>
          </div>
          <div className="info-item">
            <h3>2. Adjust Speed</h3>
            <p>Control the visualization speed to better understand each step.</p>
          </div>
          <div className="info-item">
            <h3>3. Watch & Learn</h3>
            <p>Observe the algorithm in action and learn about its complexity.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
