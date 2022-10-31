const cellElements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessageTxt = document.querySelector(".winningMessageTxt");
const winningMessage = document.querySelector(".winningMessage");
const restartButton = document.querySelector(".reiniciar")

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
    isCircle = false;

    for (const cell of cellElements){
    cell.classList.remove('circle')
    cell.classList.remove('x')
    cell.removeEventListener("click", handleClick);
    cell.addEventListener('click', handleClick, {once:true});
}

    HoverClass();
    winningMessage.classList.remove("winner");
};

const endGame = (isDraw) =>{
    if (isDraw) {
        winningMessageTxt.innerText = 'Empate!'
    } else {
        winningMessageTxt.innerText = isCircle
         ? 'O venceu!'
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

const checkDraw = () =>{
    return [...cellElements].every(cell =>{
       return cell.classList.contains('x') || cell.classList.contains("circle");
    });
}

const placeMark = (cell,classToAdd) =>{
    cell.classList.add(classToAdd);
};
const HoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircle){
        board.classList.add("circle");
    }else {
        board.classList.add("x")
    }
}
const turnos = () => {
    isCircle = !isCircle;

    HoverClass();
};

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircle ? 'circle' : 'x';
    
    placeMark(cell, classToAdd);

    const isWin = checkWin(classToAdd);

    const isDraw = checkDraw();

    if (isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true);
    } else{
        turnos();
    }
};
startGame();

restartButton.addEventListener("click",startGame)