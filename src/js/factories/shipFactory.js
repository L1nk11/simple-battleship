function newShip(length, shipName) {
    let hits = 0
    let sunk = false
    let position = []
    let name = shipName

    const hit = () => {
        hits++
    }

    function isSunk() {
        if (hits > (length / 4) * 3) {
            return sunk = true
        }
        return sunk = false
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