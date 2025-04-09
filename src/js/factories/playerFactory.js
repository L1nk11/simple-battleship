import { newShip } from "./shipFactory"
import { newBoard } from "./boardFactory"

function newPlayer() {
    const board = newBoard()
    const shipColection = []
    let shipIndex = 0
    let indexEnd = false
    let score = 0

    function increaseScore() {
        return score++
    }

    function getScore() {
        return score
    }

    function setShips() {
        const ship1 = newShip(5, 'carrier')
        const ship2 = newShip(4, 'battleship')
        const ship3 = newShip(3, 'cruiser')
        const ship4 = newShip(3, 'submarine')
        const ship5 = newShip(2, 'destroyer')

        shipColection.push(ship1)
        shipColection.push(ship2)
        shipColection.push(ship3)
        shipColection.push(ship4)
        shipColection.push(ship5)
    }
    setShips()

    function getShipColection() {
        return shipColection
    }

    function isIndexAtEnd() {
        return indexEnd
    }

    function getIndex() {
        return shipIndex
    }

    function advanceShipIndex() {
        if (shipIndex < shipColection.length) {
            shipIndex++
            console.log('ship index = '+shipIndex)
            if (shipIndex == 5) {
                indexEnd = true
            }
        }
    }

    return {board, increaseScore, getScore, setShips, getShipColection, advanceShipIndex, isIndexAtEnd, getIndex}
}

export {newPlayer}