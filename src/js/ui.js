import { newPlayer } from "./factories/playerFactory"

const body = document.querySelector('body')
let canProceed = false
let orientation = 'horizontal'

function gameStart() {
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    const placement = document.createElement('div')
    placement.classList.add('form-holder')
    overlay.style.display = 'flex'
    // overlay.style.display = ''

    overlay.appendChild(placement)
    body.appendChild(overlay)

    const player1 = newPlayer()
    const player2 = newPlayer() // <- bot
    startForm(player1)

    
}
gameStart()

function startForm(player1) {
    // make a form and get the board to place the ship
    // when the play button is pressed send position to board
    // and remove overlay
    const title = document.createElement('div')
    const subTitle = document.createElement('div')
    const rotateButton = document.createElement('button')
    const playButton = document.createElement('button')
    const formHolder = document.querySelector('.form-holder')
    subTitle.classList.add('subtitle')

    rotateButton.addEventListener('click', () => {
        if (orientation === 'horizontal') {
            orientation = 'vertical'
        } else {
            orientation = 'horizontal'
        }
    })

    rotateButton.textContent = 'Rotate'
    playButton.textContent = 'Play game'

    title.textContent = 'Welcome to Battleship'

    // get ships and for each one wait player to click on cell and for each
    // click count one++ until it is equal to ship list length
    // also when selecting cell call function to place ship on map.
    // placeShips(player1.getShipColection()) <- deprecated

    playButton.addEventListener('click', () => {
        console.log(canProceed)
        if (canProceed === true) {
            // allow player to proceed to the game
            console.log('able to continue')
        }
    })

    formHolder.appendChild(title)
    formHolder.appendChild(subTitle)
    formHolder.appendChild(rotateButton)
    formHolder.appendChild(genBoard(player1))
    formHolder.appendChild(playButton)
}

function genBoard(player) {
    const boardHolder = document.createElement('div')
    boardHolder.classList.add('board-holder')
    
    for (let y = 0; y < player.board.getBoard().length; y++) {
        const row = document.createElement('div')
        row.classList.add('row')

        for (let x = 0; x < player.board.getBoard()[y].length; x++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            
            cell.dataset.x = x
            cell.dataset.y = y

            cell.addEventListener('click', () => {
                let helper = shipPlacement(player, parseInt(cell.dataset.x), parseInt(cell.dataset.y))

                if (helper === true) {
                    updateBoard()
                }
            })

            row.appendChild(cell)
        }
        boardHolder.appendChild(row)
    }
    return boardHolder
}

function setTheme() {
    // make function to change theme
    body.id = 'dark'
}
setTheme()

function shipPlacement(player, x, y) {
    if (player.isIndexAtEnd() === true) {
        console.log(player.board.getBoard())
        return
    } else {
        const ship = player.getShipColection()[player.getIndex()]
        
        let a = player.board.placeShip(ship, x, y, orientation)
        if (a === true) {
            player.advanceShipIndex()
            if (player.isIndexAtEnd() === true) {
                canProceed = true 
            }
            console.log(canProceed)
            return true
        } else if (a === false) {
            console.log('some error ocurred')
            return false
        }
        
    }
}

function updateBoard() {
    
}