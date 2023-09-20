// let firstMove = true;

// const gameBoard = (() => {
//     const game = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
//     return { game };
// })();

// const Player = () => {
//     const move = firstMove ? "X" : 'O';
//     firstMove = firstMove ? !firstMove : firstMove;
//     const occupy = function (field) {
//         if (!field.classList.contains('occupedX') && !field.classList.contains('occupedO')) {
//             if (move === "X") {
//                 field.classList.add('occupedX');
//             } else if (move === "O") {
//                 field.classList.add('occupedO');
//             }
//             field.innerText = move;
//             firstMove = !firstMove;
//             console.log(gameBoard.game)
//         }
//     }
//     return { occupy, move }
// }

// const game = (() => {
//     const player1 = Player();
//     const player2 = Player();
//     return { player1, player2, firstMove }
// })();

// const displayController = (() => {
//     const updateScreen = function () {
//         document.body.innerHTML = '';
//         gameBoard.game.forEach((move) => {
//             const moveElement = document.createElement('button');
//             moveElement.innerText = move;
//             moveElement.style = 'height: 60px; width: 60px; font-size: 42px;';
//             moveElement.addEventListener('click', () => {
//                 const player = firstMove ? game.player1 : game.player2;
//                 player.occupy(moveElement);
//                 const index = gameBoard.game.indexOf(move);
//                 if (!moveElement.classList.contains('occupedX') && !moveElement.classList.contains('occupedO')) {
//                     gameBoard.game.splice(index, 1, player.move);
//                 }
//             });
//             document.body.appendChild(moveElement);
//         });
//     };
//     return { updateScreen };
// })();

// displayController.updateScreen();

const gameBoard = (() => {
    let firstMove = true;
    const fields = ['', '', '', '', '', '', '', '', ''];
    const winCheck = (move) => {
        // logic :3
        if ((fields[0] === 'x' && fields[1] === 'x' && fields[2] === 'x') || (fields[0] === 'o' && fields[1] === 'o' && fields[2] === 'o') || (fields[3] === 'x' && fields[4] === 'x' && fields[5] === 'x') || (fields[3] === 'o' && fields[4] === 'o' && fields[5] === 'o') || (fields[6] === 'x' && fields[7] === 'x' && fields[8] === 'x') || (fields[6] === 'o' && fields[7] === 'o' && fields[8] === 'o') || (fields[0] === 'x' && fields[4] === 'x' && fields[8] === 'x') || (fields[0] === 'o' && fields[4] === 'o' && fields[8] === 'o') || (fields[2] === 'x' && fields[4] === 'x' && fields[6] === 'x') || (fields[2] === 'o' && fields[4] === 'o' && fields[6] === 'o') || (fields[0] === 'x' && fields[3] === 'x' && fields[6] === 'x') || (fields[0] === 'o' && fields[3] === 'o' && fields[6] === 'o') || (fields[1] === 'x' && fields[4] === 'x' && fields[7] === 'x') || (fields[1] === 'o' && fields[4] === 'o' && fields[7] === 'o') || (fields[2] === 'x' && fields[5] === 'x' && fields[8] === 'x') || (fields[2] === 'o' && fields[5] === 'o' && fields[8] === 'o')) {
            console.log(`${move} win`);
        }   
    }
    return {fields, firstMove, winCheck}
})();


const screenController = (() => {
    const board = document.querySelector('#board')
    const updateScreen = () => {
        board.innerHTML = '';
        gameBoard.fields.forEach((field, index) => {
            const fieldElement = document.createElement('button');
            fieldElement.innerText = field;
            fieldElement.classList.add('fieldElement');
            fieldElement.addEventListener('click', () => {
                if (!fieldElement.classList.contains('occuped')) {
                    const move = gameBoard.firstMove ? 'x' : 'o'

                    gameBoard.fields.splice(index, 1, move);
                    gameBoard.winCheck(move);

                    fieldElement.innerText = move;
                    fieldElement.classList.add(move);
                    fieldElement.classList.add('occuped');

                    gameBoard.firstMove = !gameBoard.firstMove;
                }
            });
            board.appendChild(fieldElement);
        });
    }
    return {updateScreen}
})();

screenController.updateScreen();
