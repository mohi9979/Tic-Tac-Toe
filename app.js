const firebaseConfig = {
  apiKey: "AIzaSyCLhpnci6po9caHAl_M_Yj-YQqx3wiUdOo",
  authDomain: "tic-tac-toe-online-cdcdc.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-online-cdcdc-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-online-cdcdc",
  storageBucket: "tic-tac-toe-online-cdcdc.firebasestorage.app",
  messagingSenderId: "595792486870",
  appId: "1:595792486870:web:1d606c013355ef0d5ac477",
  measurementId: "G-ZFRV4PPLZ3"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


const homeScreen = document.getElementById("homeScreen");
const botScreen = document.getElementById("botScreen");
const onlineScreen = document.getElementById("onlineScreen");
const onlineGameScreen = document.getElementById("onlineGameScreen");

function hideAllScreens() {

    homeScreen.classList.add("hidden");
    botScreen.classList.add("hidden");
    onlineScreen.classList.add("hidden");
    onlineGameScreen.classList.add("hidden");
}

function goHome() {

    hideAllScreens();

    homeScreen.classList.remove("hidden");
}

function showBotGame() {

    hideAllScreens();

    botScreen.classList.remove("hidden");

    restartBotGame();
}

function showOnlineGame() {

    hideAllScreens();

    onlineScreen.classList.remove("hidden");
}


// ========================================
// BOT GAME
// ========================================

let botBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let difficulty = "hard";

let gameOver = false;

const botBoardElement =
    document.getElementById("botBoard");

const botStatus =
    document.getElementById("botStatus");


function setDifficulty(level) {

    difficulty = level;

    document
        .querySelectorAll(".difficulty button")
        .forEach(button => {
            button.classList.remove("selected");
        });

    event.target.classList.add("selected");

    restartBotGame();
}


function createBotBoard() {

    botBoardElement.innerHTML = "";

    botBoard.forEach((value, index) => {

        const cell = document.createElement("div");

        cell.className = "cell";

        cell.textContent = value;

        if (value === "X") {
            cell.classList.add("x");
        }

        if (value === "O") {
            cell.classList.add("o");
        }

        cell.onclick = () => playerMove(index);

        botBoardElement.appendChild(cell);
    });
}


function restartBotGame() {

    botBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    gameOver = false;

    botStatus.textContent = "Your turn";

    createBotBoard();
}


function playerMove(index) {

    if (gameOver) return;

    if (botBoard[index] !== "") return;

    botBoard[index] = "X";

    createBotBoard();

    const result = checkWinner(botBoard);

    if (result) {

        finishBotGame(result);

        return;
    }

    botStatus.textContent = "Bot is thinking...";

    setTimeout(botMove, 350);
}


function botMove() {

    if (gameOver) return;

    let move;

    if (difficulty === "easy") {

        move = randomMove();

    } else if (difficulty === "medium") {

        move =
            Math.random() < 0.5
                ? randomMove()
                : getBestMove();

    } else {

        move = getBestMove();
    }

    if (move !== -1) {

        botBoard[move] = "O";
    }

    createBotBoard();

    const result = checkWinner(botBoard);

    if (result) {

        finishBotGame(result);

        return;
    }

    botStatus.textContent = "Your turn";
}


function randomMove() {

    const empty = [];

    botBoard.forEach((cell, index) => {

        if (cell === "") {
            empty.push(index);
        }
    });

    if (empty.length === 0) {
        return -1;
    }

    return empty[
        Math.floor(Math.random() * empty.length)
    ];
}


// ========================================
// MINIMAX AI
// ========================================

function getBestMove() {

    let bestScore = -Infinity;

    let move = -1;

    for (let i = 0; i < 9; i++) {

        if (botBoard[i] === "") {

            botBoard[i] = "O";

            let score = minimax(
                botBoard,
                false
            );

            botBoard[i] = "";

            if (score > bestScore) {

                bestScore = score;

                move = i;
            }
        }
    }

    return move;
}


function minimax(board, isMaximizing) {

    const result = checkWinner(board);

    if (result === "O") return 10;

    if (result === "X") return -10;

    if (result === "draw") return 0;


    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {

            if (board[i] === "") {

                board[i] = "O";

                const score =
                    minimax(board, false);

                board[i] = "";

                bestScore =
                    Math.max(bestScore, score);
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {

            if (board[i] === "") {

                board[i] = "X";

                const score =
                    minimax(board, true);

                board[i] = "";

                bestScore =
                    Math.min(bestScore, score);
            }
        }

        return bestScore;
    }
}


// ========================================
// WINNER CHECK
// ========================================

function checkWinner(board) {

    const combinations = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    for (const combo of combinations) {

        const [a, b, c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            return board[a];
        }
    }


    if (board.every(cell => cell !== "")) {

        return "draw";
    }


    return null;
}


function finishBotGame(result) {

    gameOver = true;

    if (result === "X") {

        botStatus.textContent =
            "🎉 You Win!";

    } else if (result === "O") {

        botStatus.textContent =
            "🤖 Bot Wins!";

    } else {

        botStatus.textContent =
            "🤝 Draw!";
    }
}


// ========================================
// ONLINE MULTIPLAYER
// ========================================

// Supabase multiplayer code will be added
// after creating the Supabase project.

function createRoom() {

    document.getElementById("onlineStatus").textContent =
        "Supabase setup required for online multiplayer.";
}


function joinRoom() {

    document.getElementById("onlineStatus").textContent =
        "Supabase setup required for online multiplayer.";
}


function leaveRoom() {

    showOnlineGame();
}
function generateRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        code += characters.charAt(
            Math.floor(
                Math.random() *
                characters.length
            )
        );
    }

    return code;
}

// Start

createBotBoard();


function createRoom() {

    const roomCode =
        generateRoomCode();

    const roomRef =
        database.ref(
            "games/" + roomCode
        );


    const initialGame = {

        board: [
            "", "", "",
            "", "", "",
            "", "", ""
        ],

        turn: "X",

        playerX: true,

        playerO: false,

        status: "waiting",

        winner: ""

    };


    roomRef
        .set(initialGame)
        .then(() => {

            console.log(
                "Room created:",
                roomCode
            );

            localStorage.setItem(
                "roomCode",
                roomCode
            );

            localStorage.setItem(
                "player",
                "X"
            );

            startOnlineGame(
                roomCode,
                "X"
            );

        })
        .catch(error => {

            console.error(error);

            alert(
                "Could not create room."
            );

        });
}


function joinRoom() {

    const roomCode =
        document
            .getElementById("roomInput")
            .value
            .trim()
            .toUpperCase();


    if (roomCode.length !== 6) {

        alert(
            "Enter a valid room code."
        );

        return;
    }


    const roomRef =
        database.ref(
            "games/" + roomCode
        );


    roomRef.once("value")
        .then(snapshot => {

            if (!snapshot.exists()) {

                alert(
                    "Room not found."
                );

                return;
            }


            const game =
                snapshot.val();


            if (game.playerO) {

                alert(
                    "Room is full."
                );

                return;
            }


            roomRef.update({

                playerO: true,

                status: "playing"

            });


            localStorage.setItem(
                "roomCode",
                roomCode
            );

            localStorage.setItem(
                "player",
                "O"
            );


            startOnlineGame(
                roomCode,
                "O"
            );

        });
}


function startOnlineGame(
    roomCode,
    player
) {

    hideAllScreens();

    onlineGameScreen
        .classList
        .remove("hidden");


    document
        .getElementById(
            "roomCodeDisplay"
        )
        .textContent = roomCode;


    const roomRef =
        database.ref(
            "games/" + roomCode
        );


    roomRef.on(
        "value",
        snapshot => {

            if (!snapshot.exists()) {

                return;
            }


            const game =
                snapshot.val();


            currentOnlineGame =
                game;


            renderOnlineBoard(
                game.board
            );


            updateOnlineStatus(
                game,
                player
            );

        }
    );
}


function renderOnlineBoard(board) {

    const boardElement =
        document.getElementById(
            "onlineBoard"
        );


    boardElement.innerHTML = "";


    board.forEach(
        (value, index) => {

            const cell =
                document.createElement(
                    "div"
                );


            cell.className =
                "cell";


            cell.textContent =
                value;


            if (value === "X") {

                cell.classList.add(
                    "x"
                );
            }


            if (value === "O") {

                cell.classList.add(
                    "o"
                );
            }


            cell.onclick = () => {

                makeOnlineMove(
                    index
                );

            };


            boardElement.appendChild(
                cell
            );

        }
    );
}


let currentOnlineGame = null;


function makeOnlineMove(index) {

    const roomCode =
        localStorage.getItem(
            "roomCode"
        );


    const player =
        localStorage.getItem(
            "player"
        );


    if (
        !roomCode ||
        !player ||
        !currentOnlineGame
    ) {

        return;
    }


    const game =
        currentOnlineGame;


    // Game শেষ
    if (
        game.status ===
        "finished"
    ) {

        return;
    }


    // Opponent-এর turn
    if (
        game.turn !== player
    ) {

        return;
    }


    // Already occupied
    if (
        game.board[index] !== ""
    ) {

        return;
    }


    const newBoard = [
        ...game.board
    ];


    newBoard[index] =
        player;


    const result =
        checkWinner(newBoard);


    const roomRef =
        database.ref(
            "games/" + roomCode
        );


    if (result) {

        roomRef.update({

            board: newBoard,

            status: "finished",

            winner: result

        });

        return;
    }


    const nextTurn =
        player === "X"
            ? "O"
            : "X";


    roomRef.update({

        board: newBoard,

        turn: nextTurn

    });

}


function updateOnlineStatus(
    game,
    player
) {

    const status =
        document.getElementById(
            "onlineStatusGame"
        );


    if (
        game.status ===
        "waiting"
    ) {

        status.textContent =
            "Waiting for opponent...";

        return;
    }


    if (
        game.status ===
        "finished"
    ) {

        if (
            game.winner ===
            "draw"
        ) {

            status.textContent =
                "🤝 Draw!";

        } else if (
            game.winner ===
            player
        ) {

            status.textContent =
                "🎉 You Win!";

        } else {

            status.textContent =
                "😔 You Lose!";
        }

        return;
    }


    if (
        game.turn ===
        player
    ) {

        status.textContent =
            "Your turn";

    } else {

        status.textContent =
            "Opponent's turn";
    }
}




