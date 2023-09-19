let firstMove = true;

const gameBoard = (() => {
    const game = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    return { game };    
})();

const Player = () => {
    const move = firstMove ? "X" : 'O';
    firstMove = firstMove ? !firstMove : firstMove;
    const occupy = function (field) {
        if (!field.classList.contains('occupedX') && !field.classList.contains('occupedO')) {
            if (move === "X") {
                field.classList.add('occupedX');
            } else if (move === "O") {
                field.classList.add('occupedO');
            }
            field.innerText = move;
            firstMove = !firstMove;
            console.log(gameBoard.game)
        }
    }
    return { occupy, move }
}

const game = (() => {
    const player1 = Player();
    const player2 = Player();
    return { player1, player2, firstMove }
})();

const displayController = (() => {
    const display = function () {
        document.body.innerHTML = '';
        gameBoard.game.forEach((move) => {
            const moveElement = document.createElement('button');
            moveElement.innerText = move;
            moveElement.style = 'height: 60px; width: 60px; font-size: 42px;';
            moveElement.addEventListener('click', () => {
                const player = firstMove ? game.player1 : game.player2;
                player.occupy(moveElement);
                const index = gameBoard.game.indexOf(move);
                if (!moveElement.classList.contains('occupedX') && !moveElement.classList.contains('occupedO')) {
                    gameBoard.game.splice(index, 1, player.move);
                }
            });
            document.body.appendChild(moveElement);
        });
    };
    return { display };
})();

displayController.display()
