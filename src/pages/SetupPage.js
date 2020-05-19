import React, { useState, useEffect, useGlobal, useDispatch } from 'reactn'
import { Page } from 'elements'
import {
  Box,
  Grid,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel
} from '@material-ui/core'
import Input from 'components/Input'
import { RiLayoutRowLine } from 'react-icons/ri'
import { RiLayoutColumnLine } from 'react-icons/ri'
import { FaBomb } from 'react-icons/fa'

const SetupPage = () => {
  const updateConfig = useDispatch('updateConfig')
  const [config] = useGlobal('config')
  const [selectedMode, setSelectedMode] = useState(0)
  const [modes, setModes] = useState([])
  const [rows, setRows] = useState(0)
  const [cols, setCols] = useState(0)
  const [mines, setMines] = useState(0)
  const [showMines, setShowMines] = useState(false)
  const [showNearbyMines, setShowNearbyMines] = useState(false)

  const onTabChange = (e, index) => {
    setSelectedMode(index)
  }

  const getValue = (type) => {
    if (!modes[selectedMode]) return 0
    return modes[selectedMode][type]
  }

  const onShowMinesChange = ({ target: { checked } }) => {
    setShowMines(checked)
    updateConfig({
      ...config,
      misc: {
        ...config.misc,
        showMines: checked
      }
    })
  }

  const onShowNearbyMinesChange = ({ target: { checked } }) => {
    setShowNearbyMines(checked)
    updateConfig({
      ...config,
      misc: {
        ...config.misc,
        showNearbyMines: checked
      }
    })
  }

  const onRowsChange = (rows) => {
    setRows(rows)

    updateConfig({
      ...config,
      modes: config.modes.map((mode, i) => {
        if (selectedMode !== i) return mode

        return {
          ...mode,
          rows
        }
      })
    })
  }

  const onColsChange = (cols) => {
    setCols(cols)

    updateConfig({
      ...config,
      modes: config.modes.map((mode, i) => {
        if (selectedMode !== i) return mode

        return {
          ...mode,
          cols
        }
      })
    })
  }

  const onMinesChange = (mines) => {
    setMines(mines)
  }

  useEffect(() => {
    const { modes, misc } = config
    const { showMines, showNearbyMines } = misc
    setModes(config.modes)
    setShowMines(showMines)
    setShowNearbyMines(showNearbyMines)
  }, [])

  useEffect(() => {
    setRows(getValue('rows'))
    setCols(getValue('cols'))
    setMines(getValue('mines'))
  }, [modes, selectedMode])

  return (
    <Page>
      <h2>Game setup</h2>

      <Box padding="1rem 0">
        <h3>Difficulty</h3>

        <Tabs
          value={selectedMode}
          indicatorColor="primary"
          textColor="primary"
          onChange={onTabChange}
          aria-label="disabled tabs example"
        >
          {modes.map((mode, i) => (
            <Tab key={`mode-${i}`} label={mode.name} />
          ))}
        </Tabs>

        <Grid container justify="center" alignItems="center">
          <Input
            icon={<RiLayoutRowLine />}
            label="Rows"
            type="number"
            value={rows}
            onChange={onRowsChange}
          />
          <Input
            icon={<RiLayoutColumnLine />}
            label="Columns"
            type="number"
            value={cols}
            onChange={onColsChange}
          />
          <Input
            icon={<FaBomb />}
            label="Mines"
            type="number"
            value={mines}
            onChange={onMinesChange}
          />
        </Grid>
      </Box>

      <Box padding="1rem 0">
        <h3>Misc</h3>

        <Box display="flex" flexDirection="column">
          <FormControlLabel
            control={
              <Checkbox
                checked={showMines || false}
                onChange={onShowMinesChange}
                name="showMines"
                color="primary"
              />
            }
            label="Show mines"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={showNearbyMines || false}
                onChange={onShowNearbyMinesChange}
                name="showNearbyMines"
                color="primary"
              />
            }
            label="Show nearby mines"
          />
        </Box>
      </Box>
    </Page>
  )
}

export default SetupPage
