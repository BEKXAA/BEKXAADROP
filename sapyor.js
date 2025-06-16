const board = document.getElementById("board");
const coinDisplay = document.getElementById("coin");
const size = 10;
const mineCount = 15;
let coin = 0;
let cells = [];

function init() {
    board.innerHTML = "";
    coin = 0;
    coinDisplay.textContent = "Coin: " + coin;
    cells = [];
    const mines = new Set();
    while (mines.size < mineCount) {
        mines.add(Math.floor(Math.random() * size * size));
    }

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const content = document.createElement("div");
        content.classList.add("cell-content");
        cell.appendChild(content);
        board.appendChild(cell);
        const row = Math.floor(i / size);
        const col = i % size;
        const isMine = mines.has(i);
        cells.push({element: cell, row, col, isMine, revealed: false});
        cell.addEventListener("click", () => reveal(i));
        cell.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            cell.classList.toggle("flag");
        });
    }
}

function reveal(index) {
    const cell = cells[index];
    if (cell.revealed || cell.element.classList.contains("flag")) return;
    cell.revealed = true;
    cell.element.classList.add("open");
    if (cell.isMine) {
        alert("💣 Bomba! O'yin tugadi!");
        init();
        return;
    }
    coin++;
    coinDisplay.textContent = "Coin: " + coin;
    const content = cell.element.querySelector(".cell-content");
    const adjacentMines = countAdjacentMines(cell.row, cell.col);
    if (adjacentMines > 0) {
        content.textContent = adjacentMines;
    } else {
        getNeighbors(cell.row, cell.col).forEach(n => reveal(n));
    }
}

function countAdjacentMines(row, col) {
    return getNeighbors(row, col).filter(i => cells[i].isMine).length;
}

function getNeighbors(row, col) {
    const neighbors = [];
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const r = row + dr, c = col + dc;
            if (r >= 0 && r < size && c >= 0 && c < size) {
                neighbors.push(r * size + c);
            }
        }
    }
    return neighbors;
}

init();
