let fieldsShape = [];
let currentShape = 'x';
let gameOver = false;
let winner;

function fillShape(id) {
    if (!fieldsShape[id] && !gameOver) {
        fieldsShape[id] = currentShape;
    if (currentShape == 'x') {
        currentShape = 'circle';
        document.getElementById('player2').classList.remove('d-none');
        document.getElementById('player1').classList.add('d-none')
    } else {
        currentShape = 'x';
        document.getElementById('player1').classList.remove('d-none')
        document.getElementById('player2').classList.add('d-none');
    }
    draw();
    checkWin();
    }  
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
        if(winner == 'circle') {
            winnerPlayer2();
        } else {
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
        document.getElementById('line_8').style.transform = 'scaleX(1) rotate(315deg)';
    }
}

function winnerPlayer1() {
    setTimeout(function(){
        document.getElementById('winner_overlay').classList.remove('d-none');
        document.getElementById('winner').style.transform = 'scaleX(1.5) scale3d(1.5, 1.5, 1.5) scaleY(1.5)'
        document.getElementById('winner').style.color = '#75e690'
        document.getElementById('winner_is').innerHTML = `
        <img src="img/x.png" alt="">
        <h2 class="h2">Player 1</h2>
        `;
    }, 1000);
}

function winnerPlayer2() {
    setTimeout(function(){
        document.getElementById('winner_overlay').classList.remove('d-none');
        document.getElementById('winner').style.transform = 'scaleX(1.5) scale3d(1.5, 1.5, 1.5) scaleY(1.5)'
        document.getElementById('winner_is').innerHTML = `
        <img src="img/circle.png" alt="">
        <h2 class="h2">Player 2</h2>
        `;
    }, 1000);
}