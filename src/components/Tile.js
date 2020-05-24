import React, { useGlobal, useState, useEffect } from 'reactn'
import { Box } from '@material-ui/core'
import Mine from 'components/Mine'
import useLongPress from 'utils/useLongPress'
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
  revealed,
  detonated
}) => {
  const [config, setConfig] = useGlobal('config')
  const [highlighted, setHighlighted] = useState(false)

  const onAddFlag = (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (typeof onFlag !== 'function') return
    onFlag()
  }

  const withLongPress = useLongPress(onAddFlag, 500)

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
    setHighlighted(true)
  }

  useEffect(() => {
    if (!highlighted) return
    const timer = setTimeout(() => {
      setHighlighted(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [highlighted])

  return (
    <Box onClick={onClick} onContextMenu={onAddFlag} position="relative">
      <TileBox
        revealed={revealed}
        selectedMode={config.selectedMode}
        detonated={withMine && detonated}
        highlighted={highlighted}
      >
        {config.misc.showNumbers && <p>{pos}</p>}
        {children}
        {flagged && <FaFlag />}
        {(config.misc.showNearbyMines || revealed) && <i>{nearbyMines}</i>}

        {withMine && (
          <Mine
            show={config.misc.showMines || revealed || detonated}
            selectedMode={config.selectedMode}
          />
        )}
      </TileBox>
    </Box>
  )
}

export default Tile
