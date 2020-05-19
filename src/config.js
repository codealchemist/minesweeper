import React, {
  useGlobal,
  useEffect,
  addCallback,
  setGlobal,
  addReducer
} from 'reactn'
import store from 'store2'
import defaultConfig from 'game-config'

const savedConfig = store.get('config')
const config = savedConfig || defaultConfig

export const save = (config) => {
  store.set('config', config)
}

addReducer('updateConfig', (global, dispatch, newConfig) => {
  console.log('CONFIG REDUCER', newConfig)
  const updatedConfig = {
    ...config,
    ...newConfig
  }
  save(updatedConfig)
  return { config: updatedConfig }
})

setGlobal({ config })

export default config
