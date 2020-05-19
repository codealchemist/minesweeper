import React, { useGlobal, useEffect } from 'reactn'
import { Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const GameMessage = () => {
  const [config, setConfig] = useGlobal('config')

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfig({
        ...config,
        gameMessage: null
      })
    }, 4000)
    return () => clearTimeout(timer)
  }, [config.gameMessage])

  return (
    <Box
      position="absolute"
      bottom="0"
      display="flex"
      justifyContent="center"
      width="100%"
      zIndex="10"
    >
      {config.gameMessage && (
        <Alert severity={config.gameMessage.type}>
          {config.gameMessage.text}
        </Alert>
      )}
    </Box>
  )
}

export default GameMessage
