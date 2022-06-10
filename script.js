let fieldsShape = [];
let currentShape = 'x';
let gameOver = false;
let winner;
let equal = 0;
let player = '';
let changename = '';
let names = ['Player 1', 'Player 2'];
let totalWinsPlayer1 = 0;
let totalWinsPlayer2 = 0;

document.addEventListener('keydown', keyDown);


function keyDown(e) {
    if (e.key === "Enter") {
        let newName = document.getElementById('inputfield');
        if (changename == 'player2') {
            document.getElementById('player2').innerHTML = `${newName.value}`;
            names[1] = newName.value;
            changeName();
            saveName();
        } else {
            document.getElementById('player1').innerHTML = `${newName.value}`;
            names[0] = newName.value;
            changeName();
            saveName();
        }
    }
}

function saveName() {
    let namesAsText = JSON.stringify(names);
    localStorage.setItem('name', namesAsText);
}

function loadName() {
    let namesAsText = localStorage.getItem('name');
    if (namesAsText) {
        names = JSON.parse(namesAsText);
        document.getElementById('player1').innerHTML = names[0];
        document.getElementById('player2').innerHTML = names[1];
        document.getElementById('players1').innerHTML = names[0];
        document.getElementById('players2').innerHTML = names[1];
    }
}

function openMenu() {
    styleNavIcon();
    document.getElementById('navinner').classList.toggle('d-none');
    loadName();
}

function styleNavIcon() {
    document.getElementById('line1').classList.toggle('line1_open');
    document.getElementById('line2').classList.toggle('line2_open');
}

function changeName(id) {
    document.getElementById('change_name').classList.toggle('d-none');
    document.getElementById(`inputfield`).focus();
    changename = id;
    document.getElementById('inputfield').value = '';
}

function countWins(number) {
    if(number == 1){
        totalWinsPlayer1++;
    }else {
        totalWinsPlayer2++;
    }
    document.getElementById('wins_player1').innerHTML = totalWinsPlayer1;
    document.getElementById('wins_player2').innerHTML = totalWinsPlayer2;
}



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
    document.getElementById('area_players1').classList.toggle('d-none');
    document.getElementById('area_players2').classList.toggle('d-none');
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
            player = names[1];
            winnerPlayer2();
            countWins(2);
        } else {
            player = names[0];
            winnerPlayer1();
            countWins(1);
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
        showAnimatedPlayer();
        setTimeout(function () {
            document.getElementById('area_restart').innerHTML = `
        <button onclick="restart()" id="restart_game" class="restart_game">Restart Game</button>
        `;
        }, 2500);
    }, 1000);
}

function showAnimatedWinner1() {
    document.getElementById('winner_overlay').classList.remove('d-none');
    document.getElementById('winner').style.color = '#75e690';
    setTimeout(() => {
        document.getElementById('winner').style.transform = 'scaleX(1.5) scale3d(1.5, 1.5, 1.5) scaleY(1.5)'
    }, 100);
}

function winnerPlayer2() {
    document.getElementById('winner_is').innerHTML = '';
    setTimeout(function () {
        showAnimatedWinner2();
        showAnimatedPlayer();
        setTimeout(function () {
            document.getElementById('area_restart').innerHTML = `
        <button onclick="restart()" id="restart_game" class="restart_game">Restart Game</button>
        `;
        }, 2500);
    }, 1000);
}

function showAnimatedWinner2() {
    document.getElementById('winner_overlay').classList.remove('d-none');
    document.getElementById('winner').style.color = '#3ab3eafc';
    setTimeout(() => {
        document.getElementById('winner').style.transform = 'scaleX(1.5) scale3d(1.5, 1.5, 1.5) scaleY(1.5)'
    }, 100);
}

function showAnimatedPlayer() {
    document.getElementById('winner_is').innerHTML = `
    <img class="winner_shape" src="img/${winner}.png" alt="">
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
    document.getElementById('area_players1').classList.remove('d-none');
    document.getElementById('area_players2').classList.add('d-none');
    resetOverlay();
}

function resetOverlay() {
    document.getElementById('winner_overlay').classList.add('d-none');
    document.getElementById('winner').innerHTML = 'Winner';
    document.getElementById('area_restart').innerHTML = '';
    document.getElementById('winner').style.transform = 'scaleX(0.0) scale3d(0.0, 0.0, 0.0) scaleY(0.0)'
    document.getElementById('winner_is').innerHTML = '';
    resetLines();
}

function resetLines() {
    for (let i = 1; i < 9; i++) {
        document.getElementById('line_' + i).style.transform = 'scaleX(0.0)';
    }

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