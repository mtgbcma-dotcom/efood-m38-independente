import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/roboto/latin-100.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-700.css'
import '@fontsource/roboto/latin-900.css'

import App from './App'
import { RestaurantsProvider } from './context/RestaurantsContext'
import { Provider } from 'react-redux'
import { createAppStore } from './store'

import { GlobalStyle } from './styles'

const store = createAppStore()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle />
        <RestaurantsProvider><App /></RestaurantsProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
