function gameManager(player1, player2) {
    setBoards(player1, player2)
}

function setBoards(player1, player2) {
    const main = document.querySelector('main')
    const contentHolder = document.createElement('div')
    contentHolder.classList.add('board-holders')
    main.innerHTML = ''

    contentHolder.appendChild(genMainBoard(player1))
    populateBotBoard(player2)
    contentHolder.appendChild(genMainBoard(player2))
    console.log(player1.board.getBoard())
    main.appendChild(contentHolder)
}

function genMainBoard(player) {
    const board = document.createElement('div')
    board.classList.add('board')
    if (player.getType() === 'bot') {
        board.classList.add('attackable')
    }

    for (let y = 0; y < player.board.getBoard().length; y++) {
        const row = document.createElement('div')
        row.classList.add('row')

        for (let x = 0; x < player.board.getBoard()[y].length; x++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            
            if (player.board.getBoard()[y][x].hasShip === true) {
                cell.id = 'ship'
            }

            if (player.getType() === 'bot') {
                cell.addEventListener('click', () => {
                    // add function to allow attack
                })
            }

            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    return board
}

function populateBotBoard(bot) {
    
}

export {gameManager}
