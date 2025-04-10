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
            
            if (player.board.getBoard()[y][x].hasShip === true && player.getType() === 'player') {
                cell.id = 'ship'
            }

            if (player.getType() === 'bot') {
                cell.addEventListener('click', () => {
                    // add function to allow player to attack
                })
            }

            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    return board
}

function populateBotBoard(bot) {
    const shipList = bot.getShipColection()

    for (let i = 0; i < shipList.length; i++) {
        // define orientation
        let orientation = ''
        let randomBit = Math.random() < 0.5 ? 0 : 1;
        if (randomBit === 1) {
            orientation = 'horizontal'
        } else if (randomBit === 0) {
            orientation = 'vertical'
        } else {
            console.log(`error when defining ${shipList[i].getName()} orientation`)
            return
        }
        
        // define x and y
        let xCordinate = undefined
        let yCordinate = undefined
        if (orientation === 'horizontal') {
            xCordinate = Math.floor(Math.random() * (10 - shipList[i].getLength()))
            yCordinate = Math.floor(Math.random() * 10)
        } else {
            xCordinate = Math.floor(Math.random() * 10)
            yCordinate = Math.floor(Math.random() * (10 - shipList[i].getLength()))
        }
        
        let res = bot.board.placeShip(bot.getShipColection()[i], xCordinate, yCordinate, orientation)

        if (!res.success) {
            i--
            continue
        }
    }
    console.log(bot.board.getBoard())
}

export {gameManager}
