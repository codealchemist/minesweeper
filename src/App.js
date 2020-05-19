import React, { useDispatch, useEffect } from 'reactn'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Box } from '@material-ui/core'
import { BoardPage, HistoryPage, SetupPage } from 'pages'
import PageNav from 'components/PageNav'
import EndModal from 'components/EndModal'
import { Sidebar } from 'elements'
import theme from 'themes/dark'
import GlobalStyles from 'themes/GlobalStyles'
import appConfig from 'config'
import gameState from 'gameState'

const App = () => {
  const newGame = useDispatch('newGame')

  useEffect(() => {
    console.log('-- INIT APP --')
    newGame()
  }, [])

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Box flexDirection="row" display="flex" width="100vw" height="100vh">
            <EndModal />

            <Sidebar>
              <PageNav />
            </Sidebar>

            <Box padding="1rem" width="100%" height="100%">
              <h1>Minesweeper</h1>

              <Route path="/setup">
                <SetupPage />
              </Route>

              <Route path="/history">
                <HistoryPage />
              </Route>

              <Route path="/" exact>
                <BoardPage />
              </Route>
            </Box>
          </Box>
        </ThemeProvider>
      </Switch>
    </Router>
  )
}

export default App
