function gameManager(player1, player2) {
    setBoards(player1, player2)
}

let turn =  0
let lastBotAttack = {}
let lastBotAttackHitted = false

function setBoards(player1, player2) {
    const main = document.querySelector('main')
    const contentHolder = document.createElement('div')
    contentHolder.classList.add('board-holders')
    main.innerHTML = ''

    contentHolder.appendChild(genMainBoard(player1))
    populateBotBoard(player2)
    contentHolder.appendChild(genMainBoard(player2))
    main.appendChild(contentHolder)
    manageAttack(player2, player1)

}

function genMainBoard(player) {
    console.log(player.board.getBoard()[0])
    const board = document.createElement('div')
    board.classList.add('board')
    if (player.getType() === 'bot') {
        board.classList.add('attackable')
    } else {
        board.classList.add('player')
    }

    for (let y = 0; y < player.board.getBoard().length; y++) {
        const row = document.createElement('div')
        row.classList.add('row')

        for (let x = 0; x < player.board.getBoard()[y].length; x++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')

            cell.dataset.x = x
            cell.dataset.y = y
            
            if (player.board.getBoard()[y][x].hasShip === true && player.getType() === 'player') {
                cell.id = 'ship'
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
}

function playerCanAttack() {
    // must return true or false
    if (turn % 2 === 0) {
        return true
    }

    return false
}

function advanceTurn() {
    return turn++
}

function genBotAttack(bot, player) {
    const playerBoard = document.querySelector('.player')

    const cordinates = defineCordinates(playerBoard, player)
    const x = cordinates.X
    const y = cordinates.Y

    const cell = playerBoard.querySelector(`.cell[data-x='${x}'][data-y='${y}']`)
    const attack = player.board.placeAttack(x, y)

    if (attack === false) {
        return
    } else if (attack.hitted === true) {
        return
    } else if (attack.success === true) {
        cell.id = 'hit'
        lastBotAttack = {X: x, Y: y}
        lastBotAttackHitted = true
        // check if bot sunk all ships
    } else {
        cell.id = 'miss'
        lastBotAttack = {X: x, Y: y}
        lastBotAttackHitted = false
    }
}

function defineCordinates(playerElement, player) {
    const board = player.board.getBoard()
    const boardSize = 10

    // check valid cells and add them to a list
    let validCells = []
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = board[y][x];
            const domCell = playerElement.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
            if (domCell && !cell.isHit && (domCell.id === '' || domCell.id === 'ship')) {
                validCells.push({ x, y })
            }
        }
    }

    // if no valid cell found
    if (validCells.length === 0) {
        return false;
    }

    // map neigbors of last hitted cell and return one of them if any is avaliable
    if (lastBotAttackHitted) {
        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 }
        ]

        const neighbors = directions
            .map(d => ({
                x: lastBotAttack.X + d.dx,
                y: lastBotAttack.Y + d.dy
            }))
            .filter(pos => 
                pos.x >= 0 && pos.x < boardSize &&
                pos.y >= 0 && pos.y < boardSize &&
                !board[pos.y][pos.x].isHit
            )
            .filter(pos => {
                const domCell = playerElement.querySelector(`.cell[data-x='${pos.x}'][data-y='${pos.y}']`);
                return domCell && (domCell.id === '' || domCell.id === 'ship');
            })

        if (neighbors.length > 0) {
            const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
            return { X: pick.x, Y: pick.y };
        }
    }

    const pick = validCells[Math.floor(Math.random() * validCells.length)];
    return { X: pick.x, Y: pick.y };
}

function manageAttack(bot, player) {
    const botBoard = document.querySelector('.attackable')
    const botCells = botBoard.querySelectorAll('.cell')

    for (let i = 0; i < botCells.length; i++) {
        const cell = botCells[i]

        cell.addEventListener('click', () => {
            if (cell.id === 'miss' || cell.id === 'hit') {
                return
            }

            if (playerCanAttack()) {
                const x = cell.getAttribute('data-x')
                const y = cell.getAttribute('data-y')
                console.log(x, y)
                const a = bot.board.placeAttack(x, y)
                player.getShipColection()[0].getName()

                if (a.success === true) {
                    cell.id = 'hit'
                    console.log(a.shipRef)
                    // call damage into hitted ship
                    advanceTurn()

                    // make a check to see if player sunk all ships

                    genBotAttack(bot, player)
                    // make a check to see if bot sunk all ships

                    advanceTurn()
                } else if (a.success === false) {
                    cell.id = 'miss'
                    advanceTurn()

                    genBotAttack(bot, player)
                    // make a check to see if bot sunk all ships

                    advanceTurn()
                } else {
                    return
                }
            }
        })
        
    }
}

function hitShip(shipref, player) {
    for (let i = 0; i < player.getShipColection().length; i++) {
        if (player.getShipColection()[i].getName() === shipref.getName()) {
            player.getShipColection()[i].hit()
        }
    }
}

export {gameManager}
