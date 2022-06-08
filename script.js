let fieldsShape = [];
let currentShape = 'x';
let gameOver = false;
let winner;
let equal = 0;
let player = '';

function fillShape(id) {
    if (!fieldsShape[id] && !gameOver) {
        fieldsShape[id] = currentShape;
        if (currentShape == 'x') {
            currentShape = 'circle';
            togglePlayers();
        } else {
            currentShape = 'x';
            togglePlayers();
        }
        draw();
        checkWin();
        checkEqual();
    }
}

function togglePlayers() {
    document.getElementById('player2').classList.toggle('d-none');
    document.getElementById('player1').classList.toggle('d-none');
}

function draw() {
    for (let i = 0; i < fieldsShape.length; i++) {
        if (fieldsShape[i] == `x`) {
            document.getElementById(`x_${i}`).classList.remove('d-none');
        }
        if (fieldsShape[i] == `circle`) {
            document.getElementById(`circle_${i}`).classList.remove('d-none');
        }

    }
}

function checkWin() {
    checkHorizontalLines();
    checkVerticalLines();
    checkDiagonalLines();
    if (winner) {
        gameOver = true;
        if (winner == 'circle') {
            player = 'Player 2';
            winnerPlayer2();
        } else {
            player = 'Player 1';
            winnerPlayer1();
        }
    }
}

function checkHorizontalLines() {
    if (fieldsShape[0] == fieldsShape[1] && fieldsShape[1] == fieldsShape[2] && fieldsShape[0]) { //horizontal 
        winner = fieldsShape[0];
        document.getElementById('line_1').style.transform = 'scaleX(1)';
    }
    if (fieldsShape[3] == fieldsShape[4] && fieldsShape[4] == fieldsShape[5] && fieldsShape[3]) {
        winner = fieldsShape[3];
        document.getElementById('line_2').style.transform = 'scaleX(1)';
    }
    if (fieldsShape[6] == fieldsShape[7] && fieldsShape[7] == fieldsShape[8] && fieldsShape[6]) {
        winner = fieldsShape[6];
        document.getElementById('line_3').style.transform = 'scaleX(1)';
    }
}

function checkVerticalLines() {
    if (fieldsShape[0] == fieldsShape[3] && fieldsShape[3] == fieldsShape[6] && fieldsShape[0]) { //vertical
        winner = fieldsShape[0];
        document.getElementById('line_4').style.transform = 'scaleX(1) rotate(90deg)';
    }
    if (fieldsShape[1] == fieldsShape[4] && fieldsShape[4] == fieldsShape[7] && fieldsShape[1]) {
        winner = fieldsShape[1];
        document.getElementById('line_5').style.transform = 'scaleX(1) rotate(90deg)';
    }
    if (fieldsShape[2] == fieldsShape[5] && fieldsShape[5] == fieldsShape[8] && fieldsShape[2]) {
        winner = fieldsShape[2];
        document.getElementById('line_6').style.transform = 'scaleX(1) rotate(90deg)';
    }
}

function checkDiagonalLines() {
    if (fieldsShape[0] == fieldsShape[4] && fieldsShape[4] == fieldsShape[8] && fieldsShape[0]) { //diagonal
        winner = fieldsShape[0];
        document.getElementById('line_7').style.transform = 'scaleX(1) rotate(45deg)';
    }
    if (fieldsShape[2] == fieldsShape[4] && fieldsShape[4] == fieldsShape[6] && fieldsShape[2]) {
        winner = fieldsShape[2];
        document.getElementById('line_8').style.transform = 'scaleX(1) rotate(-45deg)';
    }
}

function winnerPlayer1() {
    document.getElementById('winner_is').innerHTML = '';
    setTimeout(function () {
        showAnimatedWinner1();
        setTimeout(function () {
            showAnimatedPlayer();
        }, 500);
    }, 1000);
}

function showAnimatedWinner1() {
    document.getElementById('winner_overlay').classList.remove('d-none');
    document.getElementById('winner').style.color = '#75e690';
    document.getElementById('winner').style.transform = 'scaleX(1.5) scale3d(1.5, 1.5, 1.5) scaleY(1.5)'
    document.getElementById('area_restart').innerHTML = `
        <button onclick="restart()" id="restart_game" class="restart_game">Restart Game</button>
        `;
}

function winnerPlayer2() {
    document.getElementById('winner_is').innerHTML = '';
    setTimeout(function () {
        showAnimatedWinner2();
        setTimeout(function () {
            showAnimatedPlayer();
        }, 500);
    }, 1000);
}

function showAnimatedWinner2() {
    document.getElementById('winner_overlay').classList.remove('d-none');
    document.getElementById('winner').style.color = '#3ab3eafc';
    document.getElementById('winner').style.transform = 'scaleX(1.5) scale3d(1.5, 1.5, 1.5) scaleY(1.5)'
    document.getElementById('area_restart').innerHTML = `
        <button onclick="restart()" id="restart_game" class="restart_game">Restart Game</button>
        `;
}

function showAnimatedPlayer() {
    document.getElementById('winner_is').innerHTML = `
    <img src="img/${winner}.png" alt="">
    <h2 class="h2">${player}</h2>
    `;
}

function restart() {
    gameOver = false;
    fieldsShape = [];
    currentShape = 'x';
    winner = '';
    equal = 0;
    player = 'x';
    resetOverlay();
}

function resetOverlay() {
    document.getElementById('winner_overlay').classList.add('d-none');
    document.getElementById('winner').innerHTML = 'Winner';
    resetLines();
}

function resetLines() {
    for (let i = 1; i < 3; i++) {
        document.getElementById('line_' + i).style.transform = 'scaleX(0.0)';
    }
    for (let i = 3; i < 6; i++) {
        document.getElementById('line_' + i).style.transform = 'scaleX(0.0)';
    }
    document.getElementById('line_7').style.transform = 'scaleX(0.0)';
    document.getElementById('line_8').style.transform = 'scaleX(0.0)';
    for (let i = 0; i < 9; i++) {
        document.getElementById('circle_' + i).classList.add('d-none');
        document.getElementById('x_' + i).classList.add('d-none');
    }
}

function checkEqual() {
    equal++;
    if (equal == 9 && !gameOver) {
        setTimeout(function () {
            document.getElementById('winner_overlay').classList.remove('d-none');
            document.getElementById('winner').innerHTML = `Equal`;
            document.getElementById('winner').style.transform = 'scaleX(1.5) scale3d(1.5, 1.5, 1.5) scaleY(1.5)'
            document.getElementById('area_restart').innerHTML = `
            <button onclick="restart()" id="restart_game" class="restart_game">Restart Game</button>
            `;
            document.getElementById('winner_is').innerHTML = '';
        }, 500);
    }
}