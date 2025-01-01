// Get valid knight moves based on position on board
function knightMoves(x, y) {
  const knight = [
    [1, 2],
    [-1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  // Store valid moves
  const validMoves = [];

  // Check valid moves
  for (let i = 0; i < knight.length; i++) {
    // Store the knight x and y coordinate(position)
    const [kX, kY] = [knight[i][0], knight[i][1]];
    // Calculate for x and y if it is still in the board
    const [currX, currY] = [x + kX, y + kY];

    // If the knight's x and y position is in range from 0 to 7
    // it is in the board
    if (currX >= 0 && currX <= 7 && currY >= 0 && currY <= 7) {
      // Push the valid move to the array
      validMoves.push([currX, currY]);
    }
  }

  // Return valid moves
  return validMoves;
}

// Find shortest path from start to finish
function shortestPath(start, end) {
  // Need a queue because we are going to use BFS on a implicit graph
  const queue = [start];
  // Have a set to avoid running in circles or having to enqueue a
  // node in the board that is already visited
  const visited = new Set();
  // Have a path to hold a list of paths for every search in the queue
  const paths = {};
  paths[`${start[0]},${start[1]}`] = [start];

  // Add the starting position(root node) to the visited variable
  visited.add(`${start[0]},${start[1]}`);

  // While the queue is not empty it proceeds
  while (queue.length > 0) {
    // Store the current knight's x and y position
    const [x, y] = queue.shift();

    // If the target is reached return the latest updated path
    if (x === end[0] && y === end[1]) {
      return paths[`${x},${y}`];
    }

    // Checks every knight moves
    for (const [nx, ny] of knightMoves(x, y)) {
      // If it has not visited it updates queue, visited, and paths
      if (!visited.has(`${nx},${ny}`)) {
        // Add new knight moves to queue
        queue.push([nx, ny]);
        // The new knight moves are already visited once discovered
        visited.add(`${nx},${ny}`);

        // Update paths every new available move is discovered
        paths[`${nx},${ny}`] = [...paths[`${x},${y}`], [nx, ny]];
      }
    }
  }

  // Return null if move is start and end does not apply
  return null;
}

// TEST
console.log(shortestPath([0, 0], [0, 0]));
