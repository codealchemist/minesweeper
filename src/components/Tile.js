import React, { useGlobal, useState } from 'reactn'
import Mine from 'components/Mine'
import { TileBox } from 'elements'
import { FaFlag } from 'react-icons/fa'

const Tile = ({
  children,
  pos,
  withMine,
  onReveal,
  onFlag,
  nearbyMines,
  flagged,
  revealed
}) => {
  const [config, setConfig] = useGlobal('config')

  const onContextMenu = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (typeof onFlag !== 'function') return
    onFlag()
  }

  const onClick = () => {
    if (flagged) {
      console.log('Avoided revealing flagged tile. Be careful!')
      setConfig({
        ...config,
        gameMessage: {
          type: 'warning',
          text: 'Avoided revealing flagged tile. Be careful!'
        }
      })
      return
    }

    if (typeof onReveal !== 'function') return
    onReveal({ pos, nearbyMines })
  }

  return (
    <div onClick={onClick} onContextMenu={onContextMenu}>
      <TileBox revealed={revealed} selectedMode={config.selectedMode}>
        <p>{pos}</p>
        {children}
        {flagged && <FaFlag />}
        {(config.misc.showNearbyMines || revealed) && <i>{nearbyMines}</i>}

        {withMine && <Mine show={config.misc.showMines || revealed} />}
      </TileBox>
    </div>
  )
}

export default Tile
