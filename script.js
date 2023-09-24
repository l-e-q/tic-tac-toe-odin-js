const gameBoard = (() => {
    let firstMove = true;
    let canMove = false;
    const fields = ['', '', '', '', '', '', '', '', ''];
    const board = document.querySelector('#board');
    let winner = '';
    let tie = false;
    const winCheck = (move) => {
        // logic :3
        if ((gameBoard.fields[0] === 'x' && gameBoard.fields[1] === 'x' && gameBoard.fields[2] === 'x') || (gameBoard.fields[0] === 'o' && gameBoard.fields[1] === 'o' && gameBoard.fields[2] === 'o') || (gameBoard.fields[3] === 'x' && gameBoard.fields[4] === 'x' && gameBoard.fields[5] === 'x') || (gameBoard.fields[3] === 'o' && gameBoard.fields[4] === 'o' && gameBoard.fields[5] === 'o') || (gameBoard.fields[6] === 'x' && gameBoard.fields[7] === 'x' && gameBoard.fields[8] === 'x') || (gameBoard.fields[6] === 'o' && gameBoard.fields[7] === 'o' && gameBoard.fields[8] === 'o') || (gameBoard.fields[0] === 'x' && gameBoard.fields[4] === 'x' && gameBoard.fields[8] === 'x') || (gameBoard.fields[0] === 'o' && gameBoard.fields[4] === 'o' && gameBoard.fields[8] === 'o') || (gameBoard.fields[2] === 'x' && gameBoard.fields[4] === 'x' && gameBoard.fields[6] === 'x') || (gameBoard.fields[2] === 'o' && gameBoard.fields[4] === 'o' && gameBoard.fields[6] === 'o') || (gameBoard.fields[0] === 'x' && gameBoard.fields[3] === 'x' && gameBoard.fields[6] === 'x') || (gameBoard.fields[0] === 'o' && gameBoard.fields[3] === 'o' && gameBoard.fields[6] === 'o') || (gameBoard.fields[1] === 'x' && gameBoard.fields[4] === 'x' && gameBoard.fields[7] === 'x') || (fields[1] === 'o' && gameBoard.fields[4] === 'o' && gameBoard.fields[7] === 'o') || (gameBoard.fields[2] === 'x' && gameBoard.fields[5] === 'x' && gameBoard.fields[8] === 'x') || (gameBoard.fields[2] === 'o' && gameBoard.fields[5] === 'o' && gameBoard.fields[8] === 'o')) {
            gameBoard.winner = `${move} is winner`;
            gameBoard.canMove = false;
            console.log(gameBoard.winner);
        } else if (!gameBoard.fields.includes('') && gameBoard.winner === '') {
            gameBoard.tie = true;
            gameBoard.canMove = false;
            console.log('tie');
        }
    };
    const restart = () => {
        gameBoard.firstMove = true;
        gameBoard.fields = ['', '', '', '', '', '', '', '', ''];
        gameBoard.canMove = true;
        gameBoard.tie = false;
        gameBoard.winner = '';
    };

    return {fields, firstMove, winCheck, board, restart, canMove, tie, winner}
})();


const screenController = (() => {
    const startButton = document.querySelector('#start-button');
    const resultElement = document.querySelector('#result');
    const updateScreen = () => {
        gameBoard.board.innerHTML = '';
        gameBoard.fields.forEach((field, index) => {
            const fieldElement = document.createElement('button');
            fieldElement.innerText = field;
            fieldElement.classList.add('fieldElement');
            fieldElement.addEventListener('click', () => {
                if (gameBoard.canMove && field !== 'x' && field !== 'o') {
                    const move = gameBoard.firstMove ? 'x' : 'o'

                    gameBoard.fields.splice(index, 1, move);
                    gameBoard.winCheck(move);

                    fieldElement.innerText = move;
                    fieldElement.classList.add('occuped');

                    gameBoard.firstMove = !gameBoard.firstMove;
                    updateScreen();
                }
            });
            gameBoard.board.appendChild(fieldElement);
            startButton.innerHTML = (gameBoard.fields.includes('x') || gameBoard.fields.includes('o') || gameBoard.canMove) ? 'Restart' : 'Start';
            if (gameBoard.winner || gameBoard.tie) {
                resultElement.classList.remove('non-displied');
                resultElement.innerText = gameBoard.winner ? gameBoard.winner : 'Tie';
            } else {
                resultElement.classList.add('non-displied')
            }
        });
        
    }

    startButton.addEventListener('click', () => {
        gameBoard.restart();
        updateScreen();
    });

    return {updateScreen}
})();

screenController.updateScreen();
