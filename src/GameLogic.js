import random from 'random'

class GameLogic {
  setBoard(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.totalTiles = rows * cols
  }

  getNewMinePosition() {
    return random.int(0, this.totalTiles - 1)
  }

  plantMines(totalMines, mines = []) {
    if (!this.totalTiles) {
      console.error(
        'Error: totalTiles needs to be set. Remember to call setBoard!'
      )
      return this
    }
    if (!totalMines) {
      console.error('Error: totalMines is required!')
      return this
    }
    this.plantedMines = new Set(mines)

    // Using a Set allows to simply avoid duplication.
    // We can now for sure we will plant exactly the amount
    // of mines we wanted.
    while (this.plantedMines.size !== totalMines) {
      const minePos = this.getNewMinePosition()
      this.plantedMines.add(minePos)
    }

    console.log('plantes mines', this.plantedMines)
    return this
  }

  getMines() {
    return this.plantedMines
  }

  /**
   * Returns true if passed position has other positions
   * above. False if not.
   *
   * @param {int} pos
   */
  hasUp(pos) {
    if (pos < this.cols) return false
    return true
  }

  /**
   * Returns true if passed position has other positions
   * below. False if not.
   *
   * @param {int} pos
   */
  hasDown(pos) {
    if (pos >= this.cols * (this.rows - 1)) return false
    return true
  }

  /**
   * Returns true if passed position has other positions
   * to the left. False if not.
   *
   * @param {int} pos
   */
  hasLeft(pos) {
    if (pos % this.cols === 0) return false
    return true
  }

  /**
   * Returns true if passed position has other positions
   * to the right. False if not.
   *
   * @param {int} pos
   */
  hasRight(pos) {
    if ((pos + 1) % this.cols === 0) return false
    return true
  }

  /**
   * Returns a Set containing the position index for tiles
   * that are in touch with passed tile position.
   * Tiles are considered to be in touch when they are in direct
   * contact, considering sides and diagonals.
   *
   * @param {int} pos
   * @returns Set
   */
  getNearbyPositions(pos) {
    const upPos = pos - this.cols
    const downPos = pos + this.cols
    const leftPos = pos - 1
    const rightPos = pos + 1
    const upRightPos = upPos + 1
    const upLeftPos = upPos - 1
    const downRightPos = downPos + 1
    const downLeftPos = downPos - 1

    // Add valid positions.
    const nearbyPositions = new Set()
    const up = this.hasUp(pos)
    const right = this.hasRight(pos)
    const down = this.hasDown(pos)
    const left = this.hasLeft(pos)

    // Cross.
    if (up) nearbyPositions.add(upPos)
    if (right) nearbyPositions.add(rightPos)
    if (down) nearbyPositions.add(downPos)
    if (left) nearbyPositions.add(leftPos)

    // Diagonals.
    if (up && right) nearbyPositions.add(upRightPos)
    if (down && right) nearbyPositions.add(downRightPos)
    if (down && left) nearbyPositions.add(downLeftPos)
    if (up && left) nearbyPositions.add(upLeftPos)

    return nearbyPositions
  }

  hasMine(pos) {
    return this.plantedMines.has(pos)
  }

  getNearbyMinesCount() {
    if (!this.plantedMines) return
    this.nearbyMines = {}

    // Iterate over planted mines and increase nearby tiles
    // by one for each mine.
    this.plantedMines.forEach((minePosition) => {
      this.getNearbyPositions(minePosition).forEach((pos) => {
        // Avoid adding positions with mines.
        if (this.hasMine(pos)) return

        this.nearbyMines[pos] = this.nearbyMines[pos] || 0
        this.nearbyMines[pos] = this.nearbyMines[pos] + 1
      })
    })

    return this.nearbyMines
  }

  setRevealedTiles(revealedTiles) {
    this.revealedTiles = revealedTiles
  }

  /**
   * Should be called when the user clicks on a clear tile:
   * This is a tile without a mine that it not nearby a mine.
   * Returns a Set with all clear tiles that touch each other,
   * until a tile nearby a mine is reached (or the board limits).
   *
   * @param {int} pos
   * @return {Set}
   */
  getClearedTiles(pos, clearedTiles = new Set(), scannedPositions = new Set()) {
    if (scannedPositions.has(pos)) {
      console.log('Skipping already scanned position', pos)
      return clearedTiles
    }
    if (this.revealedTiles.includes(pos)) {
      console.log('Skipping already revealed tile.', pos)
      return clearedTiles
    }
    scannedPositions.add(pos)
    clearedTiles.add(pos)
    const nearbyPositions = this.getNearbyPositions(pos)

    nearbyPositions.forEach((currentPos) => {
      if (this.plantedMines.has(currentPos)) return false
      if (this.revealedTiles.includes(currentPos)) return false
      clearedTiles.add(currentPos)

      if (this.nearbyMines[currentPos] !== undefined) return false
      this.getClearedTiles(currentPos, clearedTiles, scannedPositions)
    })

    return clearedTiles
  }

  reset() {
    this.rows = 0
    this.cols = 0
    this.plantedMines = new Set()
  }
}

const gameLogic = new GameLogic()
export default gameLogic
