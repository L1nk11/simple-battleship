import { newPlayer } from "./factories/playerFactory"
import {gameManager} from './gameLogic'
import { loadDarkIcon, loadLightIcon, loadGitIcon, loadRestartIcon } from "./iconLoader"

const body = document.querySelector('body')
let canProceed = false
let orientation = 'horizontal'

function setIcons() {
    const restartButton = document.querySelector('.restart')
    const githubButton = document.querySelector('.git')

    loadRestartIcon().then((icon) => {
        restartButton.innerHTML = ''
        restartButton.appendChild(icon)
    })

    loadGitIcon().then((icon) => {
        githubButton.innerHTML = ''
        githubButton.appendChild(icon)
    })
}
setIcons()

function gameStart() {
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    const placement = document.createElement('div')
    placement.classList.add('form-holder')
    overlay.style.display = 'flex'

    overlay.appendChild(placement)
    body.appendChild(overlay)

    const player1 = newPlayer('player')
    const player2 = newPlayer('bot') // <- bot
    startForm(player1, player2)
}
gameStart()

function startForm(player1, player2) {
    const overlay = document.querySelector('.overlay')
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

    playButton.addEventListener('click', () => {
        if (canProceed === true) {
            // call function to generate board in the main game area
            gameManager(player1, player2)

            // remove overlay
            overlay.innerHTML = ''
            overlay.style.display = 'none'
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
    const subtitle = document.querySelector('.subtitle')
    subtitle.textContent = 'place your carrier'
    
    for (let y = 0; y < player.board.getBoard().length; y++) {
        const row = document.createElement('div')
        row.classList.add('row')

        for (let x = 0; x < player.board.getBoard()[y].length; x++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            
            cell.dataset.x = x
            cell.dataset.y = y

            cell.addEventListener('click', () => {
                shipPlacement(player, parseInt(cell.dataset.x), parseInt(cell.dataset.y))

                switch (player.getIndex()) {
                    case 1:
                            subtitle.textContent = 'place your battleship'
                        break;
                    
                    case 2:
                            subtitle.textContent = 'place your cruiser'
                        break;

                    case 3:
                            subtitle.textContent = 'place your submarine'
                        break;

                    case 4:
                            subtitle.textContent = 'place your destroyer'
                        break;
                
                    default:
                        break;
                }
                if (canProceed == true) {
                    subtitle.textContent = "you're ready to play"
                    subtitle.id = 'ready'
                }
            })

            row.appendChild(cell)
        }
        boardHolder.appendChild(row)
    }
    return boardHolder
}

function setTheme(isFromClick) {
    // make function to change theme
    const themeButton = document.querySelector('.theme')

    if (isFromClick === true) {
        if (body.id === 'dark') {
            body.id = 'light'
            localStorage.setItem('savedTheme', 'light')
            loadLightIcon().then((icon) => {
                themeButton.innerHTML = ''
                themeButton.appendChild(icon)
            })
            return
        }
        if (body.id === 'light') {
            body.id = 'dark'
            localStorage.setItem('savedTheme', 'dark')
            loadDarkIcon().then((icon) => {
                themeButton.innerHTML = ''
                themeButton.appendChild(icon)
            })
            return
        }
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    let savedTheme = localStorage.getItem('savedTheme')
    if (savedTheme === null) {
        savedTheme = prefersDark ? 'dark' : 'light'
        localStorage.setItem('savedTheme', savedTheme)
        body.id = savedTheme
    } else {
        body.id = savedTheme
        if (savedTheme === 'dark') {
            localStorage.setItem('savedTheme', 'dark')
            loadDarkIcon().then((icon) => {
                themeButton.innerHTML = ''
                themeButton.appendChild(icon)
            })
        }
        if (savedTheme === 'light') {
            localStorage.setItem('savedTheme', 'light')
            loadLightIcon().then((icon) => {
                themeButton.innerHTML = ''
                themeButton.appendChild(icon)
            })
        }
    }
}
setTheme()

const themeButton = document.querySelector('.theme')
themeButton.addEventListener('click', () => {
    setTheme(true)
})

const restartButton = document.querySelector('.restart')
restartButton.addEventListener('click', () => {
    gameStart()
})

function shipPlacement(player, x, y) {
    if (player.isIndexAtEnd() === true) {
        return
    } else {
        const ship = player.getShipColection()[player.getIndex()]
        
        let a = player.board.placeShip(ship, x, y, orientation)
        if (a.success === true) {
            player.advanceShipIndex()
            markCells(a.list)
            if (player.isIndexAtEnd() === true) {
                canProceed = true 
            }
            return true
        } else if (a === false) {
            console.log('some error ocurred')
            return false
        }
        
    }
}

function markCells(list) {
    const form = document.querySelector('.form-holder')
    list.forEach(element => {
        const cell = form.querySelector(`.cell[data-x='${element.x}'][data-y='${element.y}']`)
        cell.id = 'marked'
    });
}

