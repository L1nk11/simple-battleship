function newBoard() {
    const board = []

    // generate 10x10 board when object is created
    function generateBoard(boardSize) {
        for (let row = 0; row < boardSize; row++) {
            const rowArray = []
            for (let collumn = 0; collumn < boardSize; collumn++) {
                rowArray.push({hasShip: false, isHit: false, x: collumn, y: row, shipReference: null})
            }
            board.push(rowArray)
        }
        return board
    }
    generateBoard(10)

    function placeShip(shipObj, x, y, orientation) {
        const placedPositions = []

        for (let i = 0; i < shipObj.getLength(); i++) {
            let targetX = x
            let targetY = y

            if (orientation === 'horizontal') {
                targetX += i
            } else if (orientation === 'vertical') {
                targetY += i
            } else {
                throw new Error("invalid orientation passed");
            }

            // check board boundarie
            if (targetX >= 10 || targetY >= 10) {
                // return false
                throw new Error("ship out of bounds");
            }

            const cell = board[targetY][targetX]

            if (cell.hasShip === true) {
                // return false
                throw new Error("the cell already has a ship");
            }

            // return true
            placedPositions.push(cell)
        }

        placedPositions.forEach(cell => {
            cell.hasShip = true
            cell.shipReference = shipObj
        })

        // create a array and pass it to shipObj.setShipPosition
        shipObj.setShipPosition(placedPositions.map(cell => ({ x: cell.x, y: cell.y })))
    }

    function placeAttack(x, y) {
        // false = attack not executed | true = attack sucessful
        board.forEach(row => {
            row.forEach(cell => {
                if (cell.x === x && cell.y === y) {
                    if (cell.isHit === true) {
                        console.log('cell already hitted')
                        return false
                    }

                    // do code to pass turn
                    cell.isHit = true

                    if (cell.hasShip === true) {
                        // return cell.shipReference
                        return true, cell.shipReference
                    }
                }
            })
        })
        return false
    }

    function getBoard() {
        return board
    }

    return {placeShip, placeAttack, getBoard}
}

export {newBoard}