import React from 'react'
import Board from 'components/Board'
import Status from 'components/Status'
import DifficultySelector from 'components/DifficultySelector'
import { Box } from '@material-ui/core'
import { Page } from 'elements'

const BoardPage = () => {
  return (
    <Page>
      <h2>Clear the board without detonating the mines!</h2>

      <Box display="flex" justifyContent="center" padding="1rem 0 0">
        <DifficultySelector />
        <Status />
      </Box>
      <Board />
    </Page>
  )
}

export default BoardPage
