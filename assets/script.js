const cellElements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessageTxt = document.querySelector(".end");
const winningMessage = document.querySelector(".vencedor");

let isCircle;

const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const startGame = () =>{
    for (const cell of cellElements){
    cell.addEventListener('click', handleClick, {once:true});
}
    isCircle = false;

    board.classList.add("x");
};

const endGame = (isDraw) =>{
    if (isDraw) {
        winningMessageTxt.innerText = 'Empate!'
    } else {
        winningMessageTxt.innerText = isCircle
         ? 'Circulo venceu!'
         : 'X Venceu!';
    }
    
    winningMessage.classList.add("winner");
};

const checkWin = (currentPlayer) => {
    return winning.some((combination) =>{
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const placeMark = (cell,classToAdd) =>{
    cell.classList.add(classToAdd);
};

const turnos = () => {
    isCircle = !isCircle;

    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircle){
        board.classList.add("circle");
    }else {
        board.classList.add("x")
    }
};

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircle ? 'circle' : 'x';
    
    placeMark(cell, classToAdd);

    const isWin = checkWin(classToAdd);
    if (isWin){
        endGame(false)
    }

    turnos();
};
startGame();