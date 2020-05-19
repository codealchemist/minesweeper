import React, { useGlobal, useEffect, useState } from 'reactn'
import prettyMs from 'pretty-ms'
import { Box, Chip } from '@material-ui/core'
import { MdTimer } from 'react-icons/md'
import { FaFlag } from 'react-icons/fa'
import { AiTwotonePlaySquare } from 'react-icons/ai'

const Status = () => {
  const [gameState] = useGlobal('gameState')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [intervalRef, setIntervalRef] = useState()

  useEffect(() => {
    const { startTime } = gameState
    if (!startTime) {
      setElapsedTime(0)
      clearInterval(intervalRef)
      return
    }

    console.log('STATUS START TIMER')
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const elapsedMs = now - startTime
      setElapsedTime(prettyMs(elapsedMs, { secondsDecimalDigits: 0 }))
    }, 1000)
    setIntervalRef(interval)

    return () => clearInterval(interval)
  }, [gameState.startTime])

  useEffect(() => {
    if (!gameState.won && !gameState.lost) return
    console.log('STOP TIMER')
    clearInterval(intervalRef)
  }, [gameState.won, gameState.lost])

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Chip icon={<MdTimer />} label={elapsedTime} className="large" />
      <Chip icon={<FaFlag />} label={gameState.flagsLeft} />
      <Chip icon={<AiTwotonePlaySquare />} label={gameState.tilesLeft || 0} />
    </Box>
  )
}

export default Status