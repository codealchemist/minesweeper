import React, { useGlobal, useDispatch } from 'reactn'
import { Button } from '@material-ui/core'
import { Modal, Spacer } from 'elements'

const EndModal = () => {
  const newGame = useDispatch('newGame')
  const [gameState, setGameState] = useGlobal('gameState')

  const cancel = () => {
    setGameState({
      ...gameState,
      showModal: false
    })
  }

  const playAgain = () => {
    newGame()
  }

  return (
    <Modal show={gameState.showModal}>
      {gameState.won && (
        <div>
          <h1>🎉</h1>
          <h1>Victory!</h1>
          <p>Continue rocking?</p>
          <Spacer />

          <div>
            <Button variant="outlined" color="primary" onClick={playAgain}>
              Sure
            </Button>
            <Button color="secondary" onClick={cancel}>
              Maybe later
            </Button>
          </div>
        </div>
      )}

      {gameState.lost && (
        <div>
          <h1>Defeat</h1>
          <p>Try again?</p>
          <Spacer />

          <div>
            <Button variant="outlined" color="secondary" onClick={playAgain}>
              Let's do this!
            </Button>
            <Button color="primary" onClick={cancel}>
              Maybe later
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default EndModal
