import React, { useGlobal, useDispatch } from 'reactn'
import { Select, MenuItem, Box } from '@material-ui/core'

const DifficultySelector = () => {
  const newGame = useDispatch('newGame')
  const updateConfig = useDispatch('updateConfig')
  const [config] = useGlobal('config')

  const onChange = async ({ target: { value } }) => {
    console.log('Selected difficulty:', value)

    // Update board.
    await updateConfig({
      ...config,
      selectedMode: value
    })
    newGame()
  }

  return (
    <Box width="9rem">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={config.selectedMode}
        onChange={onChange}
      >
        {config.modes.map((mode, i) => (
          <MenuItem key={`mode-${i}`} value={i}>
            {mode.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default DifficultySelector
