import React, {
  useGlobal,
  useEffect,
  addCallback,
  getGlobal,
  setGlobal,
  addReducer
} from 'reactn'
import store from 'store2'
import game from 'GameLogic'

const savedGameState = store.get('game-state')
const defaultGameState = {
  won: false,
  lost: false,
  startTime: null,
  flagsLeft: 0,
  tilesLeft: 0,
  tilesArray: [],
  revealedTiles: [],
  flaggedTiles: new Set(),
  plantedMines: new Set(),
  nearbyMinesCount: {}
}
const gameState = savedGameState || defaultGameState
gameState.flaggedTiles = new Set()
gameState.plantedMines = new Set()

export const save = (gameState) => {
  store.set('game-state', gameState)
}

addReducer('updateGameState', (global, dispatch, gameState) => {
  console.log('GAME STATE REDUCER', gameState)
  save(gameState)
  return { gameState }
})

addReducer('newGame', (global, dispatch, gameState) => {
  console.log('NEW GAME REDUCER')
  const { config } = getGlobal()
  const { selectedMode } = config
  const { rows, cols, mines } = config.modes[selectedMode]
  if (!rows || !cols || !mines) {
    console.log('Invalid config.', config.modes[selectedMode])
    return
  }

  game.setBoard(rows, cols)
  const plantedMines = game.plantMines(mines).getMines()
  const nearbyMinesCount = game.getNearbyMinesCount()

  const newGameState = {
    ...defaultGameState,
    tilesLeft: rows * cols - mines,
    flagsLeft: mines,
    tilesArray: new Array(rows * cols).fill(),
    revealedTiles: [],
    flaggedTiles: new Set(),
    plantedMines,
    nearbyMinesCount
  }
  save(newGameState)
  return { gameState: newGameState }
})

setGlobal({ gameState })

export default gameState
