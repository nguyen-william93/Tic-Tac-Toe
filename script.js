const cellEl = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessageEl = document.getElementById('winning-message');
const restartBtn = document.getElementById('restartButton');

const xClass = 'x'
const circleClass= 'circle'
let circleTurn;

const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
};

const swapTurn = () => {
    circleTurn = !circleTurn;
}

const setBoardHoverClass = () => {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if (circleTurn) {
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}

const checkWin = (currentClass) => {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellEl[index].classList.contains(currentClass)
        });
    })
}

const endGame = (draw) => {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    };
    winningMessageEl.classList.add('show');
}

const isDraw = () => {
    return [...cellEl].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}


const handleClick = (e) => {
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xClass
    
    placeMark(cell, currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    } else if (isDraw()){
        endGame(true)
    }  else {
        swapTurn();
        setBoardHoverClass();
    }
    //placed the mark
    //check for win
    //check for draw
    //switch turn
}

const startGame = () => {
    circleTurn = false;
    cellEl.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
    winningMessageEl.classList.remove('show');
}

restartBtn.addEventListener('click', startGame);

startGame();