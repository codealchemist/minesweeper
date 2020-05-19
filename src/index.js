import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

const isChromium = window.chrome
const bg1 = isChromium ? '\x1b[44m' : ''
const bg2 = '\x1b[40m'
console.log(`
  ${bg1}
       _    _      _                                   
      | |  | |    | |                                  
      | |  | | ___| | ___ ___  _ __ ___   ___          
      | |/\\| |/ _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\         
      \\  /\\  /  __/ | (_| (_) | | | | | |  __/         
       \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|         
                                                       
${bg2}
          _                _             _             
         | |              | |           | |            
         | |__   __ _  ___| | _____ _ __| |            
         | '_ \\ / _\` |/ __| |/ / _ \\ '__| |            
         | | | | (_| | (__|   <  __/ |  |_|            
         |_| |_|\\__,_|\\___|_|\\_\\___|_|  (_)            
                                                       
                                                       
`)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
