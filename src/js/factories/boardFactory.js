function newBoard() {
    const board = []

    function generateBoard(boardSize) {
        for (let col = 0; col < boardSize; col++) {
            const colArray = []
            for (let row = 0; row < boardSize; row++) {
                colArray.push({hasShip: false, isHit: false, x: row, y: col, shipReference: null})
            }
            board.push(colArray)
        }
        return board
    }
    generateBoard(10)

    // false = fail, true = success
    function placeShip(shipObject, x, y, orientation) {
        const cellsToFill = []

        for (let i = 0; i < shipObject.getLength(); i++) {
            let targetX = x
            let targetY = y

            if (orientation === 'horizontal') {
                targetX += i
            } else if (orientation === 'vertical') {
                targetY += i
            } else {
                // orientation check
                console.log('Invalid orientation. Must be "horizontal" or "vertical".')
                return false
            }

            // Bounds x check
            if (targetX < 0 || targetX >= board[0].length) {
                console.log('x is out of bounds')
                return false
            }

            // Bounds y check
            if (targetY < 0 || targetY >= board.length) {
                console.log('y is out of bounds')
                return false
            }

            // check ship overlap
            if (board[targetY][targetX].hasShip) {
                console.log('ship overlap detected')
                return false
            }

            cellsToFill.push(board[targetY][targetX])
        }
        
        
        // place ship inside the board
        cellsToFill.forEach(cell => {
            cell.hasShip = true
            cell.shipReference = shipObject
        });
        return {success: true, list: cellsToFill}
    }

    function placeAttack(x, y) {
        for (let i = 0; i < board.length; i++) {
            let row = board[i]
            for (let j = 0; j < row.length; j++) {
                let cell = row[j]
    
                if (cell.x == x && cell.y == y) {
                    if (cell.isHit === true) {
                        console.log('cell already hitted')
                        return { success: false, shipRef: null }
                    }
    
                    cell.isHit = true
                    if (cell.hasShip === true) {
                        console.log('attack successful')
                        return { success: true, shipRef: cell.shipReference }
                    } else {
                        console.log('attack missed')
                        return { success: false, shipRef: null }
                    }
                }
            }
        }
    
        // If no matching cell was found
        console.log('attack missed (no matching cell)')
        return { success: false, shipRef: null }
    }

    function getBoard() {
        return board
    }

    return {placeShip, placeAttack, getBoard}
}

export {newBoard}