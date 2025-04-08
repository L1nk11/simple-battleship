import { newShip } from "./shipFactory"

function newPlayer() {
    const board = newBoard()
    const shipColection = []
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

    return {board, increaseScore, getScore, setShips, getShipColection}
}