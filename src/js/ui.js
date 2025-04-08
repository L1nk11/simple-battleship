import { newPlayer } from "./factories/playerFactory"

const body = document.querySelector('body')

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

    let orientation = 'horizontal'
    rotateButton.addEventListener('click', () => {
        if (orientation === 'horizontal') {
            orientation = 'vertical'
        } else {
            orientation = 'horizontal'
        }
    })

    rotateButton.textContent = 'Rotate'
    playButton.textContent = 'Play game'

    const ships = player1.getShipColection()
    title.textContent = 'Welcome to Battleship'

    formHolder.appendChild(title)
    formHolder.appendChild(subTitle)
    formHolder.appendChild(rotateButton)
    formHolder.appendChild(genBoard(player1))
    formHolder.appendChild(playButton)
}

function genBoard(player) {
    const boardHolder = document.createElement('div')
    boardHolder.classList.add('board-holder')
    
    for (let i = 0; i < player.board.getBoard().length; i++) {
        const row = document.createElement('div')
        row.classList.add('row')

        for (let j = 0; j < player.board.getBoard()[i].length; j++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            
            cell.addEventListener('click', () => {

            })

            row.appendChild(cell)
        }
        boardHolder.appendChild(row)
    }
    return boardHolder
}