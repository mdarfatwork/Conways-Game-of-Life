document.addEventListener('DOMContentLoaded', () => {
    const rows = 30;
    const cols = 30;
    let grid = createGrid(rows, cols);
    let intervalId;
    let isRunning = false;

    const gridElement = document.getElementById('grid');
    const startStopButton = document.getElementById('startStopButton');
    const randomButton = document.getElementById('randomButton');

    function createGrid(rows, cols) {
        const grid = [];
        for (let row = 0; row < rows; row++) {
            const rowArray = [];
            for (let col = 0; col < cols; col++) {
                rowArray.push(false);
            }
            grid.push(rowArray);
        }
        return grid;
    }

    function drawGrid(grid) {
        gridElement.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (grid[row][col]) {
                    cell.classList.add('alive');
                }
                cell.addEventListener('click', () => {
                    grid[row][col] = !grid[row][col];
                    drawGrid(grid);
                });
                gridElement.appendChild(cell);
            }
        }
    }

    function updateGrid(grid) {
        const newGrid = createGrid(rows, cols);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const isAlive = grid[row][col];
                const neighbors = countAliveNeighbors(grid, row, col);
                if (isAlive && (neighbors === 2 || neighbors === 3)) {
                    newGrid[row][col] = true;
                } else if (!isAlive && neighbors === 3) {
                    newGrid[row][col] = true;
                } else {
                    newGrid[row][col] = false;
                }
            }
        }
        return newGrid;
    }

    function countAliveNeighbors(grid, row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    count += grid[newRow][newCol] ? 1 : 0;
                }
            }
        }
        return count;
    }

    function randomizeGrid(grid) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                grid[row][col] = Math.random() > 0.7;
            }
        }
        drawGrid(grid);
    }

    function toggleGame() {
        if (isRunning) {
            clearInterval(intervalId);
            startStopButton.textContent = 'Start';
        } else {
            intervalId = setInterval(() => {
                grid = updateGrid(grid);
                drawGrid(grid);
            }, 100);
            startStopButton.textContent = 'Stop';
        }
        isRunning = !isRunning;
    }

    startStopButton.addEventListener('click', toggleGame);
    randomButton.addEventListener('click', () => randomizeGrid(grid));
    drawGrid(grid);
});