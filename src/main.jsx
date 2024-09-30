import { createRoot } from 'react-dom/client'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import rootReducer, { rootSaga } from './modules/index.jsx'
// import myLogger from './middlewares/myLogger.jsx'
import logger from 'redux-logger'
import { thunk } from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware(); //사가 미들웨어를 만들어줌

// const store = createStore(rootReducer, applyMiddleware(myLogger, logger))
const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware, logger))

/**
 * 주의: 스토어 생성이 된 다음 아래 코드를 실행해야함
 */
sagaMiddleware.run(rootSaga)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
