const Cell = function() {
    let value = " ";

    const playerToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        playerToken,
        getValue
    };
};

const Gameboard = function () { // Factory function return objects, common to capitalize first letter 
    const row = 3;
    const column = 3;
    const board = [];

    // Nested for loop to create board
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row, col, player) => {
        board[row][col].playerToken(player);
    };

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithValues);
    };

    return {
        getBoard,
        placeToken,
        printBoard
    };
};

const Gamecontroller = function(playerOneName = "Player One", playerTwoName = "Player Two") {

    let board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let activePlayer = players[0];

    const swtichActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playerWin = () => {

        // Player 1 horizontal win conditions
        if (board.getBoard()[0][0].getValue() === "X" && board.getBoard()[0][1].getValue() === "X" && board.getBoard()[0][2].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        } else if (board.getBoard()[1][0].getValue() === "X" && board.getBoard()[1][1].getValue() === "X" && board.getBoard()[1][2].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        } else if (board.getBoard()[2][0].getValue() === "X" && board.getBoard()[2][1].getValue() === "X" && board.getBoard()[2][2].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        }   

        // Player 1 vertical win conditions
        if (board.getBoard()[0][0].getValue() === "X" && board.getBoard()[1][0].getValue() === "X" && board.getBoard()[2][0].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        } else if (board.getBoard()[0][1].getValue() === "X" && board.getBoard()[1][1].getValue() === "X" && board.getBoard()[2][1].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        } else if (board.getBoard()[0][2].getValue() === "X" && board.getBoard()[1][2].getValue() === "X" && board.getBoard()[2][2].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        }

        // Player 1 diagonal win conditions
        if (board.getBoard()[0][0].getValue() === "X" && board.getBoard()[1][1].getValue() === "X" && board.getBoard()[2][2].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        } else if (board.getBoard()[0][2].getValue() === "X" && board.getBoard()[1][1].getValue() === "X" && board.getBoard()[2][0].getValue() === "X") {
            console.log(`${players[0].name} wins!`);
            return true;
        }

        // Player 2 horizontal win conditions
        if (board.getBoard()[0][0].getValue() === "O" && board.getBoard()[0][1].getValue() === "O" && board.getBoard()[0][2].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        } else if (board.getBoard()[1][0].getValue() === "O" && board.getBoard()[1][1].getValue() === "O" && board.getBoard()[1][2].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        } else if (board.getBoard()[2][0].getValue() === "O" && board.getBoard()[2][1].getValue() === "O" && board.getBoard()[2][2].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        }   

        // Player 2 vertical win conditions
        if (board.getBoard()[0][0].getValue() === "O" && board.getBoard()[1][0].getValue() === "O" && board.getBoard()[2][0].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        } else if (board.getBoard()[0][1].getValue() === "O" && board.getBoard()[1][1].getValue() === "O" && board.getBoard()[2][1].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        } else if (board.getBoard()[0][2].getValue() === "O" && board.getBoard()[1][2].getValue() === "O" && board.getBoard()[2][2].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        }

        // Player 2 diagonal win conditions
        if (board.getBoard()[0][0].getValue() === "O" && board.getBoard()[1][1].getValue() === "O" && board.getBoard()[2][2].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        } else if (board.getBoard()[0][2].getValue() === "O" && board.getBoard()[1][1].getValue() === "O" && board.getBoard()[2][0].getValue() === "O") {
            console.log(`${players[1].name} wins!`);
            return true;
        }

        return false;
    };

    const playRound = (row, col) => {

        if (board.getBoard()[row][col].getValue() !== " ") return;
        
        console.log(`${getActivePlayer().token} token placed at position ${row}, ${col}...`);
        board.placeToken(row, col, getActivePlayer().token);

        if (playerWin()) {
            board.printBoard();
        } else {
            swtichActivePlayer();
            printNewRound();
        }
    };

    const resetGame = () => {
        board = Gameboard();
        activePlayer = players[0];
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        playerWin,
        getBoard: () => board.getBoard(),
        resetGame
    };
};

const ScreenController = (function () {
    const game = Gamecontroller();
    const playerTurnContent = document.querySelector("#content");
    const gameboard = document.querySelector("#gameboard");
    const resetButton = document.querySelector("button");

    const updateScreen = () => {
    gameboard.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    const isDraw = board.every(row =>
        row.every(cell => cell.getValue() === "X" || cell.getValue() === "O")
    );

    const isWin = game.playerWin();

    if (isWin) {
    playerTurnContent.textContent = `${activePlayer.name} wins!`;
    } else if (isDraw) {
        playerTurnContent.textContent = `It's a Draw!`;
    } else {
        playerTurnContent.textContent = `${activePlayer.name}'s turn`;
    }


    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.row = rowIndex;
            cellButton.dataset.col = colIndex;
            cellButton.textContent = cell.getValue();

            cellButton.disabled = isWin || isDraw;

            gameboard.appendChild(cellButton);
        });
    });
};


    const clickHandler = function (e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.col;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    };

    gameboard.addEventListener("click", clickHandler);

    resetButton.addEventListener("click", () => {
        game.resetGame();
        updateScreen();
    });

    updateScreen();
})();