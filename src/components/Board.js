import React, {
  useGlobal,
  useState,
  createRef,
  useEffect,
  useDispatch
} from 'reactn'
import { Box } from '@material-ui/core'
import { GameBoard } from 'elements'
import Tile from 'components/Tile'
import GameMessage from 'components/GameMessage'
import debounce from 'utils/debounce'
import game from 'GameLogic'

const Board = () => {
  const updateGameState = useDispatch('updateGameState')
  const [config] = useGlobal('config')
  const [gameState, setGameState] = useGlobal('gameState')
  const [width, setWidth] = useState()
  const boardRef = createRef()

  const onResizeCallback = () => {
    updateSize()
  }

  const onResize = () => {
    debounce(onResizeCallback, 500)
  }

  const updateSize = () => {
    if (!boardRef.current) return
    const { offsetWidth, offsetHeight } = boardRef.current
    if (offsetWidth < offsetHeight) {
      setWidth(offsetWidth)
    } else {
      setWidth(offsetHeight)
    }
  }

  const onMine = () => {
    console.log('BOOOOOOM!')

    // Display all mines.
    setGameState({
      ...gameState,
      lost: true,
      detonateAll: true
    })

    // Let the user view all the mess before displaying the end game modal :p
    setTimeout(() => {
      setGameState({
        ...gameState,
        showModal: true,
        lost: true,
        detonateAll: true
      })
    }, 3000)
  }

  const onReveal = ({ pos, nearbyMines }) => {
    let newGameState = { ...gameState }
    const { revealedTiles, tilesLeft, plantedMines } = gameState
    if (plantedMines.has(pos)) {
      onMine()
      return
    }

    // First move, start game.
    if (revealedTiles.length === 0) {
      const startMs = new Date().getTime()
      console.log('started at', startMs)
      newGameState.startTime = startMs
    }

    game.setRevealedTiles([...revealedTiles])

    // Add revealed tile to collection.
    revealedTiles.push(pos)

    let newTilesLeft = tilesLeft - 1
    newGameState.tilesLeft = newTilesLeft

    if (newTilesLeft === 0) {
      setGameState({
        ...newGameState,
        won: true,
        showModal: true
      })
      return
    }

    // Clear board as much as possible when tile has no nearby mines.
    if (nearbyMines) {
      setGameState(newGameState)
      return
    }
    const clearedTiles = game.getClearedTiles(pos)
    console.log('onReveal -> clearedTiles', clearedTiles)

    newGameState.revealedTiles = [...revealedTiles, ...clearedTiles]
    console.log('TOTAL Cleared', clearedTiles.size)
    newTilesLeft = tilesLeft - clearedTiles.size
    newGameState.tilesLeft = newTilesLeft

    if (newTilesLeft === 0) {
      setGameState({
        ...newGameState,
        won: true,
        showModal: true
      })
      return
    }

    setGameState(newGameState)
    console.log('gameState REVEALED TILES', gameState.revealedTiles)
    console.log('new game state', newGameState)
  }

  const flag = (pos) => {
    const { flagsLeft, flaggedTiles } = gameState

    // Remove flag.
    if (flaggedTiles.has(pos)) {
      flaggedTiles.delete(pos)
      setGameState({
        ...gameState,
        flagsLeft: flagsLeft + 1,
        flaggedTiles
      })
      return
    }

    // Check if there are flags left.
    if (flagsLeft === 0) {
      console.log('Already used all available flags!')
      return
    }

    // Add flag.
    flaggedTiles.add(pos)
    console.log('Flagged', flaggedTiles)

    setGameState({
      ...gameState,
      flagsLeft: flagsLeft - 1,
      flaggedTiles
    })
  }

  useEffect(() => {
    updateSize()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  })

  useEffect(() => {
    console.log('gameState updated')
  }, [gameState])

  return (
    <Box
      height="calc(100% - 3rem)"
      padding="1rem"
      ref={boardRef}
      display="flex"
      justifyContent="center"
    >
      <GameBoard
        rows={config.modes[config.selectedMode].rows}
        cols={config.modes[config.selectedMode].cols}
        width={width}
        locked={gameState.lost || gameState.won}
      >
        {gameState.tilesArray.map((v, i) => (
          <Tile
            key={`box-${i}`}
            pos={i}
            onReveal={onReveal}
            onFlag={() => flag(i)}
            nearbyMines={gameState.nearbyMinesCount[i]}
            revealed={gameState.revealedTiles.includes(i)}
            flagged={gameState.flaggedTiles.has(i)}
            withMine={gameState.plantedMines.has(i)}
            detonated={gameState.detonateAll}
          />
        ))}
      </GameBoard>
      <GameMessage />
    </Box>
  )
}

export default Board
