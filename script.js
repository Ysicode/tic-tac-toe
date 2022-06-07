let fieldsShape = [];
let currentShape = 'x';

function fillShape(id) {
    if (!fieldsShape[id]) {
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
    let winner;

    if (fieldsShape[0] == fieldsShape[1] && fieldsShape[1] == fieldsShape[2] && fieldsShape[0]) { //horizontal 
        winner = fieldsShape[0];
    }
    if (fieldsShape[3] == fieldsShape[4] && fieldsShape[4] == fieldsShape[5] && fieldsShape[3]) {
        winner = fieldsShape[3];
    }
    if (fieldsShape[6] == fieldsShape[7] && fieldsShape[7] == fieldsShape[8] && fieldsShape[6]) {
        winner = fieldsShape[6];
    }

    if (fieldsShape[0] == fieldsShape[3] && fieldsShape[3] == fieldsShape[6] && fieldsShape[0]) { //vertical
        winner = fieldsShape[0];
    }
    if (fieldsShape[1] == fieldsShape[4] && fieldsShape[4] == fieldsShape[7] && fieldsShape[1]) {
        winner = fieldsShape[1];
    }
    if (fieldsShape[2] == fieldsShape[5] && fieldsShape[5] == fieldsShape[8] && fieldsShape[2]) {
        winner = fieldsShape[2];
    }

    if (fieldsShape[0] == fieldsShape[4] && fieldsShape[4] == fieldsShape[8] && fieldsShape[0]) { //diagonal
        winner = fieldsShape[0];
    }
    if (fieldsShape[2] == fieldsShape[4] && fieldsShape[4] == fieldsShape[6] && fieldsShape[2]) {
        winner = fieldsShape[2];
    }

    if (winner) {
        console.log('winner is'+ winner);
    }

    
}