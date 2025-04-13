function newShip(length, shipName) {
    let hits = 0
    let position = []
    let name = shipName

    const hit = () => {
        hits++
        console.log('hitted '+ name)
    }

    function isSunk() {
        if (hits > (length / 4) * 3) {
            return true
        }
        return false
    }

    function getLength() {
        return length
    }

    function getName() {
        return name
    }

    function getShipPosition() {
        return position
    }

    function setShipPosition(array) {
        position = array
    }

    return { hit, isSunk, getLength, getShipPosition, setShipPosition, getName }
}

export {newShip}