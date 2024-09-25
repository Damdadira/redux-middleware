import { createRoot } from 'react-dom/client'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import rootReducer from './modules/index.jsx'

const store = createStore(rootReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
