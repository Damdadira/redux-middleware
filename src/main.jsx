import { createRoot } from 'react-dom/client'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import rootReducer from './modules/index.jsx'
// import myLogger from './middlewares/myLogger.jsx'
import logger from 'redux-logger'
import { thunk } from 'redux-thunk'

// const store = createStore(rootReducer, applyMiddleware(myLogger, logger))
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
