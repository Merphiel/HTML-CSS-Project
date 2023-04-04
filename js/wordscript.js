const gridSize = 13;
const words = ["", "", "", "", ""];
const found = ["", "", "", "", ""];
let score = 0;

function generateBoard() {
    const board = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(""));
    for (let i = 0; i < 5; i++) {
        let word = Array.from(words[i]);
        for (let r = 0; r < 20; r++) {
            let col = Math.floor(Math.random() * 13);
            let row = Math.floor(Math.random() * 13);
            if (tryPlaceWord(board, word, row, col, i)) {
                break;
            }
        }
    }
    return board;
}
function tryPlaceWord(board, word, row, col) {
    for (let k = 0; k < 500; k++) {
        let ranDir = Math.ceil(Math.random() * 8)
        switch (ranDir) {
            //diag1
            case 1:
                if (!(col - word.length >= 0 && row - word.length >= 0)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row - j][col - j] === "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row - j][col - j] = word[j];
                }
                return true;
            //diag2    
            case 2:
                if (!(col - word.length >= 0 && row + word.length < 13)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row + j][col - j] === "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row + j][col - j] = word[j];
                }
                return true;
            //diag3
            case 3:
                if (!(col + word.length < 13 && row - word.length >= 0)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row - j][col + j] === "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row - j][col + j] = word[j];
                }
                return true;
            //diag4
            case 4:
                if (!(col + word.length < 13 && row + word.length < 13)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row + j][col + j] === "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row + j][col + j] = word[j];

                }
                return true;
            //East
            case 5:
                if (!(col - word.length >= 0)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row][col - j] === "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row][col - j] = word[j];
                }
                return true;
            //West
            case 6:
                if (!(col + word.length < 13)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row][col + j] === "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row][col + j] = word[j];
                }
                return true;
            //North
            case 7:
                if (!(row - word.length >= 0)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row - j][col] === "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row - j][col] = word[j];
                }
                return true;
            //South
            case 8:
                if (!(row + word.length < 13)) break;
                for (let j = 0; j < word.length; j++) {
                    if (!(board[row + j][col] == "")) {
                        return false;
                    }
                }
                for (let j = 0; j < word.length; j++) {
                    board[row + j][col] = word[j];
                }
                return true;
            default:
                console.log("uhhh how? Contact Admins");
                return false;
        }
    }
    return false;
}
function fillEmptySpaces(board) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === "") {
                board[row][col] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            }
        }
    }
}

function renderBoard(board) {
    const boardElement = document.getElementById("game-board");
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = board[row][col];
            boardElement.appendChild(cell);
        }
    }
}

function addInteractivity(board) {
    const cells = document.querySelectorAll(".cell");
    let wordInProgress = "";
    let selectedCells = [];
    let wordDirection = null;

    const getDirection = (startIndex, endIndex) => {
        const startRow = Math.floor(startIndex / gridSize);
        const startCol = startIndex % gridSize;
        const endRow = Math.floor(endIndex / gridSize);
        const endCol = endIndex % gridSize;
        if (startRow === endRow) {
            if (Math.abs(startCol - endCol) != 1) return null;
            if (startCol - endCol)
                return "e";
            return "w";
        } else if (startCol === endCol) {
            if (Math.abs(startRow - endRow) != 1) return null;
            if (startRow > endRow) return "n"
            return "s"
        } else if (Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) {
            if (Math.abs(startCol - endCol) != 1 || Math.abs(startRow - endRow) != 1) return null;
            if ((startRow - endRow) > 0) {
                if ((startCol - endCol) > 0)
                    return "1";
                return "2";
            } else {
                if ((startCol - endCol) > 0)
                    return "3";
                return "4";
            }
        }
        return null;
    };

    const isValidDirection = (startIndex, endIndex, direction) => {
        curDir = getDirection(startIndex, endIndex);
        if (curDir === null) return false;
        if (curDir === wordDirection) return true;
        return false;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("mousedown", (event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            cell.classList.add("selected");
            wordInProgress += cell.textContent;
            selectedCells.push(cell);

            const mouseoverHandler = (event) => {
                event.preventDefault();
                const currentIndex = Array.from(cells).indexOf(event.target);

                if (!selectedCells.includes(event.target)) {
                    if (selectedCells.length == 0) {
                        event.target.classList.add("selected");
                        wordInProgress += event.target.textContent;
                        selectedCells.push(event.target);
                        return;
                    }
                    if (selectedCells.length == 1) {
                        wordDirection = getDirection(Array.from(cells).indexOf(selectedCells[selectedCells.length - 1]), currentIndex);
                        event.target.classList.add("selected");
                        wordInProgress += event.target.textContent;
                        selectedCells.push(event.target);
                        return;
                    }

                    if (isValidDirection(
                        Array.from(cells).indexOf(selectedCells[selectedCells.length - 1]),
                        currentIndex,
                        wordDirection
                    )) {
                        event.target.classList.add("selected");
                        wordInProgress += event.target.textContent;
                        selectedCells.push(event.target);
                    }
                }
            };

            cells.forEach((cell) => cell.addEventListener("mouseover", mouseoverHandler));

            const mouseupHandler = () => {

                if (words.includes(wordInProgress)) {
                    if (found.includes(wordInProgress)) {

                        alert(`You Already Found: ${wordInProgress}`);

                    } else {
                        alert(`You found: ${wordInProgress}`);
                        selectedCells.forEach((cell) => cell.classList.add("solved"));
                        found[score] = wordInProgress;
                        score++;
                        document.getElementById("cls" + wordInProgress).classList.add("solved");
                        if (score >= 5) {
                            alert('Congratulations! You have won. Reload the page to play again.');
                        }
                    }
                } else {
                    alert(`Not a valid word: ${wordInProgress}`);
                }

                selectedCells.forEach((cell) => cell.classList.remove("selected"));
                wordInProgress = "";
                selectedCells = [];
                wordDirection = null;

                cells.forEach((cell) => cell.removeEventListener("mouseover", mouseoverHandler));
                document.removeEventListener("mouseup", mouseupHandler);
            };

            document.addEventListener("mouseup", mouseupHandler);
        });
    });
}

async function genWord() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6e46162ea1msh97a6ae59ed31a96p17e4e8jsn1535908da6fe',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    };

    fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=5&minLength=4&maxLength=7', options)
        .then(response =>
            response.json())
        .then(data => {
            for (let i = 0; i < 5; i++) {
                words[i] = data[i];
            }
        })
        .catch(err => console.error(err));

}
async function initGame() {
    genWord();
    setTimeout(() => {
        loadLater();
    }, 3000);
}
async function loadLater() {
    document.getElementById("word-list").innerHTML = " ";
    if ((words[0] === "")) {
        console.log("Error! Connection to Api Servers not found");
        document.getElementById("word-list").innerHTML = "ERROR: API SERVER CONNECTION LOST. PLEASE TRY CONNECTING TO THE INTERNET AND RELOADING THE PAGE";
    }
    const board = generateBoard();
    fillEmptySpaces(board);
    renderBoard(board);
    addInteractivity(board);

    const wordList = document.getElementById("word-list");
    const list = new Array(1).fill(null).map(() => new Array(5).fill(""));
    for (let row = 0; row < 5; row++) {
        const cell = document.createElement("div");
        cell.classList.add("listEntry");
        cell.id = "cls" + words[row];
        cell.textContent = words[row];
        wordList.appendChild(cell);
    }
}

initGame();